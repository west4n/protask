import { z } from 'zod'

export const UpdateBoard = z.object({
	id: z.string(),
	title: z
		.string({
			required_error: 'Заголовок обязателен',
			invalid_type_error: 'Заголовок обязателен',
		})
		.min(3, 'Заголовок слишком короткий.'),
})
