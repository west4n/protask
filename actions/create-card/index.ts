'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { telegramBot } from '@/lib/telegram-bot'

import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'

import { CreateCard } from './schema'
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

	const { title, boardId, listId } = data

	let card

	try {
		const list = await db.list.findUnique({
			where: {
				id: listId,
				board: {
					orgId,
				},
			},
		})

		if (!list) {
			return { error: 'Список не найден' }
		}

		const lastCard = await db.card.findFirst({
			where: { listId },
			orderBy: {
				order: 'desc',
			},
			select: { order: true },
		})

		const newOrder = lastCard ? lastCard.order + 1 : 1

		card = await db.card.create({
			data: {
				title,
				listId,
				order: newOrder,
			},
		})

		console.log(list.telegramId)

		// if (list.telegramId) {
		// 	const message = `В списке <b>"${list.title}"</b> создана карточка <b>"${card.title}"</b>. Ожидайте получения дополнительной информации.`
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
			entityId: card.id,
			entityTitle: card.title,
			entityType: ENTITY_TYPE.CARD,
			action: ACTION.CREATE,
		})
	} catch (error) {
		return {
			error: 'Не удалось создать доску',
		}
	}

	revalidatePath(`/board/${boardId}`)

	return { data: card }
}

export const createCard = createSafeAction(CreateCard, handler)
