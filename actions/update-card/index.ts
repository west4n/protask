'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { telegramBot } from '@/lib/telegram-bot'
import { createSafeAction } from '@/lib/create-safe-action'
import { convert } from 'html-to-text'

import { UpdateCard } from './schema'
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

	const { id, boardId, ...values } = data

	let card

	try {
		card = await db.card.update({
			where: {
				id,
				list: {
					board: {
						orgId,
					},
				},
			},
			data: {
				...values,
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

		const messageText = card.description
			? convert(card.description, {
					wordwrap: 130,
					selectors: [
						{ selector: 'a', options: { hideLinkHrefIfSameAsText: true } },
					],
			  })
			: 'Карточка без описания'

		if (list.telegramId) {
			const message = `В карточке <b>"${card.title}"</b> произошло обновление. Новое описание: <pre>${messageText}</pre>`
			try {
				await telegramBot.sendMessage(list.telegramId, message, {
					parse_mode: 'HTML',
				})
				console.log('Telegram message sent')
			} catch (sendError) {
				console.error('Telegram message error', sendError)
			}
		}

		await createAuditLog({
			entityTitle: card.title,
			entityId: card.id,
			entityType: ENTITY_TYPE.CARD,
			action: ACTION.UPDATE,
		})
	} catch (error) {
		return {
			error: 'Не удалось обновить доску',
		}
	}

	revalidatePath(`/board/${boardId}`)

	return { data: card }
}

export const updateCard = createSafeAction(UpdateCard, handler)
