import { z } from 'zod'
import { Counteragent } from '@prisma/client'

import { ActionState } from '@/lib/create-safe-action'
import { CreateCounteragent } from './schema'

export type CounteragentInputType = z.infer<typeof CreateCounteragent>
export type CounteragentReturnType = ActionState<
	CounteragentInputType,
	Counteragent
>
