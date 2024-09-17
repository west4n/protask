'use client'

import { Copy, Send, Trash } from 'lucide-react'
import { useAction } from '@/hooks/use-action'
import { useParams } from 'next/navigation'

import { CardWithList } from '@/types'
import { copyCard } from '@/actions/copy-card'
import { deleteCard } from '@/actions/delete-card'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { sendTelegram } from '@/actions/send-telegram'

interface ActionProps {
	data: CardWithList
}

export const Actions = ({ data }: ActionProps) => {
	const params = useParams()

	const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
		copyCard,
		{
			onSuccess(data) {
				toast.success(`Карточка "${data.title}" скопирована! 😎`)
			},
			onError(error) {
				toast.error(error)
			},
		}
	)
	const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
		deleteCard,
		{
			onSuccess(data) {
				toast.success(`Карточка "${data.title}" удалена! 😎`)
			},
			onError(error) {
				toast.error(error)
			},
		}
	)

	const { execute: executeSendTelegram, isLoading: isLoadingTelegram } =
		useAction(sendTelegram, {
			onSuccess(data) {
				toast.success(`Карточка отправлена в телеграм! 😎`)
			},
			onError(error) {
				toast.error(error)
			},
		})

	const onCopy = (e: React.MouseEvent) => {
		e.stopPropagation()
		const boardId = params.boardId as string

		executeCopyCard({ id: data.id, boardId })
	}

	const onDelete = (e: React.MouseEvent) => {
		e.stopPropagation()
		const boardId = params.boardId as string

		executeDeleteCard({ id: data.id, boardId })
	}

	const onSendTelegram = (e: React.MouseEvent) => {
		e.stopPropagation()

		const boardId = params.boardId as string

		executeSendTelegram({ id: data.id, boardId })
	}

	return (
		<div className='space-y-2 mt-2'>
			<Button
				onClick={onCopy}
				disabled={isLoadingCopy}
				variant='gray'
				size='inline'
				className='w-full justify-start'
			>
				<Copy className='size-4 mr-2' />
				Копировать
			</Button>
			<Button
				onClick={onDelete}
				disabled={isLoadingDelete}
				variant='gray'
				size='inline'
				className='w-full justify-start'
			>
				<Trash className='size-4 mr-2' />
				Удалить
			</Button>
			<Button
				onClick={onSendTelegram}
				disabled={isLoadingDelete}
				variant='gray'
				size='inline'
				className='w-full justify-start'
			>
				<Send className='size-4 mr-2' />
				Отправить в чат
			</Button>
		</div>
	)
}

Actions.Skeleton = function SkeletonActions() {
	return (
		<div className='space-y-2 mt-2'>
			<Skeleton className='w-20 h-4 bg-neutral-200' />
			<Skeleton className='w-full h-8 bg-neutral-200' />
			<Skeleton className='w-full h-8 bg-neutral-200' />
		</div>
	)
}
