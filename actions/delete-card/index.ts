'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { telegramBot } from '@/lib/telegram-bot'
import { createSafeAction } from '@/lib/create-safe-action'

import { DeleteCard } from './schema'
import { InputType, ReturnType } from './types'
import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Не авторизован',
		}
	}

	const { id, boardId } = data

	let card

	try {
		card = await db.card.delete({
			where: {
				id,
				list: {
					board: {
						orgId,
					},
				},
			},
		})

		const list = await db.list.findUnique({
			where: {
				id: card.listId,
				board: {
					orgId,
				},
			},
		})

		if (!list) {
			return {
				error: 'Список не найден',
			}
		}

		// if (list.telegramId) {
		// 	const message = `Карточка <b>${card.title}</b> была удалена`
		// 	try {
		// 		await telegramBot.sendMessage(list.telegramId, message, {
		// 			parse_mode: 'HTML',
		// 		})
		// 		console.log('Telegram message sent')
		// 	} catch (sendError) {
		// 		console.error('Telegram message error', sendError)
		// 	}
		// }

		await createAuditLog({
			entityTitle: card.title,
			entityId: card.id,
			entityType: ENTITY_TYPE.CARD,
			action: ACTION.DELETE,
		})
	} catch (error) {
		return {
			error: 'Не удалось удалить карточку',
		}
	}

	revalidatePath(`/organization/${boardId}`)
	return { data: card }
}

export const deleteCard = createSafeAction(DeleteCard, handler)
