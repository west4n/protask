import { ruRU } from '@clerk/localizations'
import { LocalizationResource } from '@clerk/types'

export const customLocalization: LocalizationResource = {
	...ruRU,
	organizationList: {
		action__createOrganization: 'Создать организацию',
		action__invitationAccept: 'Присоединиться',
		action__suggestionsAccept: 'Просьба присоединиться',
		createOrganization: 'Создать организацию',
		invitationAcceptedLabel: 'Присоединился',
		subtitle: 'чтобы продолжить {{applicationName}}',
		suggestionsAcceptedLabel: 'Ожидают подтверждения',
		title: 'Выбрать аккаунт',
		titleWithoutPersonal: 'Выбрать организацию',
	},
	organizationProfile: {
		badge__automaticInvitation: 'Автоматические приглашения',
		badge__automaticSuggestion: 'Автоматические предложения',
		badge__manualInvitation: 'Нет автоматической регистрации',
		badge__unverified: 'Неподтверждено',
		createDomainPage: {
			subtitle:
				'Добавьте домен для подтверждения. Пользователи с адресами электронной почты на этом домене могут автоматически присоединиться к организации или подать запрос на присоединение.',
			title: 'Добавить домен',
		},
		invitePage: {
			detailsTitle__inviteFailed:
				'Не удалось отправить приглашения. Для следующих адресов электронной почты уже существуют ожидающие приглашения: {{email_addresses}}.',
			formButtonPrimary__continue: 'Отправить приглашения',
			selectDropdown__role: 'Выберите роль',
			subtitle:
				'Введите или вставьте один или несколько адресов электронной почты, разделённых пробелами или запятыми.',
			successMessage: 'Приглашения успешно отправлены',
			title: 'Пригласить новых участников',
		},
		membersPage: {
			action__invite: 'Пригласить',
			activeMembersTab: {
				menuAction__remove: 'Удалить участника',
				tableHeader__actions: '',
				tableHeader__joined: 'Присоединился',
				tableHeader__role: 'Роль',
				tableHeader__user: 'Пользователь',
			},
			detailsTitle__emptyRow: 'Нет участников для отображения',
			invitationsTab: {
				autoInvitations: {
					headerSubtitle:
						'Приглашайте пользователей, связав домен электронной почты с вашей организацией. Любой, кто зарегистрируется с соответствующим доменом электронной почты, сможет в любой момент присоединиться к организации.',
					headerTitle: 'Автоматические приглашения',
					primaryButton: 'Управление подтверждёнными доменами',
				},
				table__emptyRow: 'Нет приглашений для отображения',
			},
			invitedMembersTab: {
				menuAction__revoke: 'Отменить приглашение',
				tableHeader__invited: 'Приглашён',
			},
			requestsTab: {
				autoSuggestions: {
					headerSubtitle:
						'Пользователи, которые зарегистрируются с соответствующим доменом электронной почты, смогут видеть предложение запросить присоединение к вашей организации.',
					headerTitle: 'Автоматические предложения',
					primaryButton: 'Управление подтверждёнными доменами',
				},
				menuAction__approve: 'Одобрить',
				menuAction__reject: 'Отклонить',
				tableHeader__requested: 'Запрошенный доступ',
				table__emptyRow: 'Нет запросов для отображения',
			},
			start: {
				headerTitle__invitations: 'Приглашения',
				headerTitle__members: 'Участники',
				headerTitle__requests: 'Запросы',
			},
		},
		navbar: {
			description: 'Управляйте вашей организацией.',
			general: 'Основные',
			members: 'Участники',
			title: 'Организация',
		},
		profilePage: {
			dangerSection: {
				deleteOrganization: {
					actionDescription:
						'Введите "{{organizationName}}" ниже, чтобы продолжить.',
					messageLine1: 'Вы уверены, что хотите удалить эту организацию?',
					messageLine2: 'Это действие является постоянным и необратимым.',
					successMessage: 'Вы удалили организацию.',
					title: 'Удалить организацию',
				},
				leaveOrganization: {
					actionDescription:
						'Введите "{{organizationName}}" ниже, чтобы продолжить.',
					messageLine1:
						'Вы уверены, что хотите покинуть эту организацию? Вы потеряете доступ к этой организации и её приложениям.',
					messageLine2: 'Это действие является постоянным и необратимым.',
					successMessage: 'Вы покинули организацию.',
					title: 'Покинуть организацию',
				},
				title: 'Опасность',
			},
			domainSection: {
				menuAction__manage: 'Управлять',
				menuAction__remove: 'Удалить',
				menuAction__verify: 'Подтвердить',
				primaryButton: 'Добавить домен',
				subtitle:
					'Позволяйте пользователям автоматически присоединяться к организации или запрашивать присоединение на основе подтверждённого домена электронной почты.',
				title: 'Подтверждённые домены',
			},
			successMessage: 'Организация была обновлена.',
			title: 'Обновить профиль',
		},
		removeDomainPage: {
			messageLine1: 'Домен электронной почты {{domain}} будет удалён.',
			messageLine2:
				'Пользователи больше не смогут автоматически присоединяться к организации после этого.',
			successMessage: '{{domain}} был удалён.',
			title: 'Удалить домен',
		},
		start: {
			headerTitle__general: 'Основные',
			headerTitle__members: 'Участники',
			profileSection: {
				primaryButton: 'Обновить профиль',
				title: 'Профиль организации',
				uploadAction__title: 'Логотип',
			},
		},
		verifiedDomainPage: {
			dangerTab: {
				calloutInfoLabel:
					'Удаление этого домена повлияет на приглашённых пользователей.',
				removeDomainActionLabel__remove: 'Удалить домен',
				removeDomainSubtitle:
					'Удалите этот домен из ваших подтверждённых доменов',
				removeDomainTitle: 'Удалить домен',
			},
			enrollmentTab: {
				automaticInvitationOption__description:
					'Пользователи автоматически приглашаются присоединиться к организации при регистрации и могут присоединиться в любой момент.',
				automaticInvitationOption__label: 'Автоматические приглашения',
				automaticSuggestionOption__description:
					'Пользователи получают предложение запросить присоединение, но должны быть одобрены администратором перед тем, как смогут присоединиться к организации.',
				automaticSuggestionOption__label: 'Автоматические предложения',
				calloutInfoLabel:
					'Изменение режима регистрации повлияет только на новых пользователей.',
				calloutInvitationCountLabel:
					'Ожидающие приглашения, отправленные пользователям: {{count}}',
				calloutSuggestionCountLabel:
					'Ожидающие предложения, отправленные пользователям: {{count}}',
				manualInvitationOption__description:
					'Пользователей можно пригласить в организацию только вручную.',
				manualInvitationOption__label: 'Нет автоматической регистрации',
				subtitle:
					'Выберите, как пользователи с этого домена могут присоединяться к организации.',
			},
			start: {
				headerTitle__danger: 'Опасность',
				headerTitle__enrollment: 'Опции регистрации',
			},
			subtitle:
				'Домен {{domain}} теперь подтверждён. Продолжите, выбрав режим регистрации.',
			title: 'Обновить {{domain}}',
		},
		verifyDomainPage: {
			formSubtitle:
				'Введите код подтверждения, отправленный на ваш адрес электронной почты',
			formTitle: 'Код подтверждения',
			resendButton: 'Не получили код? Повторно отправить',
			subtitle:
				'Домен {{domainName}} необходимо подтвердить через электронную почту.',
			subtitleVerificationCodeScreen:
				'Код подтверждения был отправлен на {{emailAddress}}. Введите код, чтобы продолжить.',
			title: 'Подтвердить домен',
		},
	},
}
