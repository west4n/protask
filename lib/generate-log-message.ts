import { ACTION, AuditLog } from '@prisma/client'

export const generateLogMessage = (log: AuditLog) => {
	const { action, entityTitle, entityType } = log

	switch (action) {
		case ACTION.CREATE:
			if (entityType === 'BOARD') {
				return `Создана доска "${entityTitle}"`
			} else if (entityType === 'LIST') {
				return `Создан список "${entityTitle}"`
			} else if (entityType === 'CARD') {
				return `Создана карточка "${entityTitle}"`
			}

		case ACTION.UPDATE:
			if (entityType === 'BOARD') {
				return `Обновлена доска "${entityTitle}"`
			} else if (entityType === 'LIST') {
				return `Обновлен список "${entityTitle}"`
			} else if (entityType === 'CARD') {
				return `Обновлена карточка "${entityTitle}"`
			}

		case ACTION.DELETE:
			if (entityType === 'BOARD') {
				return `Удалена доска "${entityTitle}"`
			} else if (entityType === 'LIST') {
				return `Удален список "${entityTitle}"`
			} else if (entityType === 'CARD') {
				return `Удалена карточка "${entityTitle}"`
			}

		default:
			return 'Неизвестное действие'
	}
}
