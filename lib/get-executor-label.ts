import { EXECUTOR } from '@prisma/client'

export const getExecutorLabel = (executor: EXECUTOR): string => {
	switch (executor) {
		case EXECUTOR.ARTEM:
			return 'Артём'
		case EXECUTOR.ANDREY:
			return 'Андрей'
		case EXECUTOR.NOTHING:
			return 'Нету'
		default:
			return 'Неизвестно'
	}
}
