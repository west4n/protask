'use server'

import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'
import { revalidatePath } from 'next/cache'

import { CreateCounteragent } from './schema'
import { CounteragentInputType, CounteragentReturnType } from './types'
import { auth } from '@clerk/nextjs/server'

const handler = async (
	data: CounteragentInputType
): Promise<CounteragentReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return { error: 'Не авторизован' }
	}

	try {
		const counteragent = await db.counteragent.create({
			data: {
				name: data.name,
			},
		})

		revalidatePath(`/organization/${orgId}/activity`)

		return { data: counteragent }
	} catch (error) {
		return { error: 'Не удалось создать контрагента' }
	}
}

export const createCounteragent = createSafeAction(CreateCounteragent, handler)
