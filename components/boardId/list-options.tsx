'use client'

import { MoreHorizontal, X } from 'lucide-react'
import { List } from '@prisma/client'

import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { FormSubmit } from '../form/form-submit'

import { useAction } from '@/hooks/use-action'
import { deleteList } from '@/actions/delete-list'
import { toast } from 'sonner'
import { ElementRef, useRef } from 'react'
import { copyList } from '@/actions/copy-list'

interface ListOptonsProps {
	data: List
	onAddCard: () => void
}

export const ListOptons = ({ data, onAddCard }: ListOptonsProps) => {
	const closeRef = useRef<ElementRef<'button'>>(null)

	const { execute: executeDelete } = useAction(deleteList, {
		onSuccess: data => {
			toast.success(`Список "${data.title}" удален! 😎`)
			closeRef.current?.click()
		},
		onError: error => {
			toast.error(error)
		},
	})

	const { execute: executeCopy } = useAction(copyList, {
		onSuccess: data => {
			toast.success(`Список "${data.title}" скопирован! 😎`)
			closeRef.current?.click()
		},
		onError: error => {
			toast.error(error)
		},
	})

	const onDelete = (formData: FormData) => {
		const id = formData.get('id') as string
		const boardId = formData.get('boardId') as string

		executeDelete({ id, boardId })
	}

	const onCopy = (formData: FormData) => {
		const id = formData.get('id') as string
		const boardId = formData.get('boardId') as string

		executeCopy({ id, boardId })
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className='size-auto p-2' variant='ghost'>
					<MoreHorizontal className='size-4' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='px-0 pt-3 pb-3' side='bottom' align='start'>
				<div className='text-sm font-medium text-center text-neutral-600 pb-4'>
					Список действий
				</div>
				<PopoverClose asChild>
					<Button
						className='size-auto p-2 absolute top-2 right-2 text-neutral-600'
						variant='ghost'
						ref={closeRef}
					>
						<X className='size-4' />
					</Button>
				</PopoverClose>
				<Button
					onClick={onAddCard}
					className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
					variant='ghost'
				>
					Добавить карточку...
				</Button>
				<form action={onCopy}>
					<input hidden name='id' id='id' value={data.id} />
					<input hidden name='boardId' id='boardId' value={data.boardId!} />
					<FormSubmit
						variant='ghost'
						className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
					>
						Копировать список...
					</FormSubmit>
				</form>
				<Separator />
				<form action={onDelete}>
					<input hidden name='id' id='id' value={data.id} />
					<input hidden name='boardId' id='boardId' value={data.boardId!} />
					<FormSubmit
						variant='ghost'
						className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
					>
						Удалить список
					</FormSubmit>
				</form>
			</PopoverContent>
		</Popover>
	)
}
