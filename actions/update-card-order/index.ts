'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'
import { telegramBot } from '@/lib/telegram-bot'
import { convert } from 'html-to-text'

import { UpdateCardOrder } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Не авторизован',
		}
	}

	const { items, boardId } = data

	let updatedCards

	try {
		const transaction = items.map(card =>
			db.card.update({
				where: {
					id: card.id,
					list: {
						board: {
							orgId,
						},
					},
				},
				data: {
					order: card.order,
					listId: card.listId,
				},
			})
		)

		updatedCards = await db.$transaction(transaction)

		for (const card of items) {
			const list = await db.list.findUnique({
				where: {
					id: card.listId,
				},
				select: {
					telegramId: true,
					title: true,
				},
			})

			if (list?.telegramId) {
				const description = card.description
					? convert(card.description, {
							wordwrap: 130,
							selectors: [
								{ selector: 'a', options: { hideLinkHrefIfSameAsText: true } },
							],
					  })
					: 'Карточка без описания'

				const message = `<pre>${description}</pre>`

				try {
					await telegramBot.sendMessage(list.telegramId, message, {
						parse_mode: 'HTML',
					})
					console.log('Telegram message sent')
				} catch (sendError) {
					console.error('Telegram message error', sendError)
				}
			}
		}
	} catch (error) {
		return {
			error: 'Ошибка при обновлении карточек',
		}
	}

	revalidatePath(`/board/${boardId}`)

	return { data: updatedCards }
}

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler)
