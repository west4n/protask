import { z } from 'zod'

export const UpdateCard = z.object({
	id: z.string(),
	boardId: z.string(),
	description: z.optional(
		z
			.string({
				required_error: 'Описание обязательно',
				invalid_type_error: 'Описание обязательно',
			})
			.min(3, 'Описание слишком короткое.')
	),
	title: z.optional(
		z
			.string({
				required_error: 'Заголовок обязателен',
				invalid_type_error: 'Заголовок обязателен',
			})
			.min(3, 'Заголовок слишком короткий.')
	),
})
