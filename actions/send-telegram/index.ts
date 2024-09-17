'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { telegramBot } from '@/lib/telegram-bot'
import { createSafeAction } from '@/lib/create-safe-action'
import { InputType, ReturnType } from './types'
import { SendTelegram } from './schema'
import { getExecutorLabel } from '@/lib/get-executor-label'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return { error: 'Не авторизован' }
	}

	const { id, boardId } = data

	let card

	try {
		card = await db.card.findUnique({
			where: { id },
			include: {
				list: true,
			},
		})

		if (!card) {
			return {
				error: 'Карточка не найдена',
			}
		}

		const list = card.list

		if (!list) {
			return {
				error: 'Список не найден',
			}
		}

		const messageText = `
  <b>Сообщение:</b> ${card.title} 
  <b>Контрагент:</b> ${card.counteragent ? card.counteragent : 'Не выбран'} 
  <b>Исполнитель:</b> ${getExecutorLabel(card.executor)} 
  <b>Дата:</b> ${
		card.date ? card.date.toLocaleDateString('ru-RU') : 'Не указана'
	}
`

		if (list.telegramId) {
			const message = messageText
			try {
				await telegramBot.sendMessage(list.telegramId, message, {
					parse_mode: 'HTML',
				})
			} catch (sendError) {
				console.log('sendError', sendError)
			}
		}
	} catch (error) {
		return {
			error: 'Не удалось отправить сообщение',
		}
	}

	revalidatePath(`/board/${boardId}`)

	return { data: card }
}

export const sendTelegram = createSafeAction(SendTelegram, handler)
