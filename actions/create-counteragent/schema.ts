import { z } from 'zod'

export const CreateCounteragent = z.object({
	name: z.string().min(1, 'Название обязательно'),
})
