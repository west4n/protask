import { z } from 'zod'

export const SendTelegram = z.object({
	id: z.string(),
	boardId: z.string(),
})
