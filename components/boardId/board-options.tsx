'use client'

import { MoreHorizontal, Trash2, X } from 'lucide-react'

import { deleteBoard } from '@/actions/delete-board'
import { useAction } from '@/hooks/use-action'
import { toast } from 'sonner'

import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

interface BoardOptionsProps {
	id: string
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
	const { execute, isLoading } = useAction(deleteBoard, {
		onError: error => {
			toast.error(error)
		},
	})

	const onDelete = () => {
		execute({ id })
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className='h-auto w-auto p-2' variant='transparent'>
					<MoreHorizontal className='size-4' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='px-0 pt-3 pb-3' side='bottom' align='start'>
				<div className='text-sm font-medium text-center text-neutral-600 pb-4'>
					Действия с доской
				</div>

				<PopoverClose asChild>
					<Button
						className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
						variant='ghost'
					>
						<X className='size-4' />
					</Button>
				</PopoverClose>

				<Button
					variant='ghost'
					onClick={onDelete}
					className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
					disabled={isLoading}
				>
					<Trash2 className='size-4 mr-2 text-neutral-600' />
					Удалить доску
				</Button>
			</PopoverContent>
		</Popover>
	)
}
