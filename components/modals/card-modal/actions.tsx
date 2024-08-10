'use client'

import { Copy, Trash } from 'lucide-react'
import { useAction } from '@/hooks/use-action'
import { useParams } from 'next/navigation'

import { CardWithList } from '@/types'
import { copyCard } from '@/actions/copy-card'
import { deleteCard } from '@/actions/delete-card'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { useCardModal } from '@/hooks/use-card-modal'

interface ActionProps {
	data: CardWithList
}

export const Actions = ({ data }: ActionProps) => {
	const params = useParams()
	const { onClose } = useCardModal()

	const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
		copyCard,
		{
			onSuccess(data) {
				toast.success(`Карточка "${data.title}" скопирована! 😎`)
				onClose()
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
				onClose()
			},
			onError(error) {
				toast.error(error)
			},
		}
	)

	const onCopy = () => {
		const boardId = params.boardId as string

		executeCopyCard({ id: data.id, boardId })
	}

	const onDelete = () => {
		const boardId = params.boardId as string

		executeDeleteCard({ id: data.id, boardId })
	}

	return (
		<div className='space-y-2 mt-2'>
			<p className='text-sm font-semibold'>Действия</p>
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
