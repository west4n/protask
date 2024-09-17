import { EXECUTOR } from '@prisma/client'
import { z } from 'zod'

export const UpdateCard = z.object({
	id: z.string(),
	boardId: z.string(),
	description: z.optional(
		z.union([z.string().min(3, 'Описание слишком короткое.'), z.any()])
	),
	title: z.optional(
		z
			.string({
				required_error: 'Заголовок обязателен',
				invalid_type_error: 'Заголовок обязателен',
			})
			.min(3, 'Заголовок слишком короткий.')
	),
	executor: z.optional(z.nativeEnum(EXECUTOR)),
	counteragent: z.optional(z.string()),
	date: z.optional(z.date()),
})
