'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'

import { CopyList } from './schema'
import { InputType, ReturnType } from './types'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { createAuditLog } from '@/lib/create-audit-log'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Не авторизован',
		}
	}

	const { id, boardId } = data

	let list

	try {
		const listCopy = await db.list.findUnique({
			where: {
				id,
				boardId,
				board: {
					orgId,
				},
			},
			include: {
				cards: true,
			},
		})

		if (!listCopy) {
			return { error: 'Список не найден' }
		}

		const lastList = await db.list.findFirst({
			where: { boardId },
			orderBy: { order: 'desc' },
			select: { order: true },
		})

		const newOrder = lastList ? lastList.order + 1 : 1

		list = await db.list.create({
			data: {
				boardId: listCopy.boardId,
				title: `${listCopy.title} - копия`,
				order: newOrder,
				cards: {
					createMany: {
						data: listCopy.cards.map(card => ({
							title: card.title,
							description: card.description,
							order: card.order,
						})),
					},
				},
			},
			include: {
				cards: true,
			},
		})

		await createAuditLog({
			entityTitle: list.title,
			entityId: list.id,
			entityType: ENTITY_TYPE.LIST,
			action: ACTION.CREATE,
		})
	} catch (error) {
		return {
			error: 'Не удалось скопировать список',
		}
	}

	revalidatePath(`/organization/${boardId}`)
	return { data: list }
}

export const copyList = createSafeAction(CopyList, handler)
