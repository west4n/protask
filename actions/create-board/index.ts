'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'
import { InputType, ReturnType } from './types'
import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'
import { CreateBoard } from './schema'
import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Не авторизован',
		}
	}

	const { title, image } = data

	const [imageId, imageThumbUrl, imageFullUrl, imageUserName, imageLinkHTML] =
		image.split('|')

	if (
		!imageId ||
		!imageThumbUrl ||
		!imageFullUrl ||
		!imageUserName ||
		!imageLinkHTML
	) {
		return {
			error: 'Отсутствующие поля. Ошибка создания доски.',
		}
	}

	let board

	try {
		board = await db.board.create({
			data: {
				title,
				orgId,
				imageId,
				imageThumbUrl,
				imageFullUrl,
				imageUserName,
				imageLinkHTML,
			},
		})

		await createAuditLog({
			entityTitle: board.title,
			entityId: board.id,
			entityType: ENTITY_TYPE.BOARD,
			action: ACTION.CREATE,
		})
	} catch (error) {
		return {
			error: 'Не удалось создать доску',
		}
	}

	revalidatePath(`/board/${board?.id}`)
	return { data: board }
}

export const createBoard = createSafeAction(CreateBoard, handler)
