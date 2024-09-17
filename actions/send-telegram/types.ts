import { z } from 'zod'
import { Card } from '@prisma/client'

import { SendTelegram } from './schema'
import { ActionState } from '@/lib/create-safe-action'

export type InputType = z.infer<typeof SendTelegram>
export type ReturnType = ActionState<InputType, Card>
