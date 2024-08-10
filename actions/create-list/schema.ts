import { z } from 'zod'

export const CreateList = z.object({
	boardId: z.string(),
	title: z
		.string({
			required_error: 'Заголовок обязателен',
			invalid_type_error: 'Заголовок обязателен',
		})
		.min(3, 'Заголовок слишком короткий.'),
})
