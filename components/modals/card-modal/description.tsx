'use client'

import { useState, useRef, ElementRef } from 'react'
import { useParams } from 'next/navigation'
import { useAction } from '@/hooks/use-action'
import { AlignLeft } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { CardWithList } from '@/types'

import { updateCard } from '@/actions/update-card'
import { Skeleton } from '@/components/ui/skeleton'
import { FormTextarea } from '@/components/form/form-textarea'
import { FormSubmit } from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface DescriptionProps {
	data: CardWithList
}

export const Description = ({ data }: DescriptionProps) => {
	const params = useParams()
	const queryClient = useQueryClient()

	const [isEditing, setIsEditing] = useState(false)

	const formRef = useRef<ElementRef<'form'>>(null)
	const textareaRef = useRef<ElementRef<'textarea'>>(null)

	const enableEditing = () => {
		setIsEditing(true)
		setTimeout(() => {
			textareaRef.current?.focus()
		})
	}

	const disableEditing = () => {
		setIsEditing(false)
	}

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			disableEditing()
		}

		if (e.ctrlKey && e.key === 'Enter') {
			if (isEditing && formRef.current) {
				const formData = new FormData(formRef.current)
				onSubmit(formData)
			}
		}
	}

	useEventListener('keydown', onKeyDown)
	useOnClickOutside(formRef, disableEditing)

	const { execute, fieldErrors } = useAction(updateCard, {
		onSuccess: data => {
			queryClient.invalidateQueries({
				queryKey: ['card', data.id],
			})
			toast.success(`Карточка "${data.title}" обновлена! 😎`)
			disableEditing()
		},
		onError: error => {
			toast.error(error)
		},
	})

	const onSubmit = (formData: FormData) => {
		const description = formData.get('description') as string
		const boardId = params.boardId as string

		execute({ description, boardId, id: data.id })
	}

	return (
		<div className='flex items-start gap-x-3 w-full'>
			<AlignLeft className='size-5 mt-0.5 text-neutral-700' />
			<div className='w-full'>
				<p className='font-semibold text-neutral-700 mb-2'>Описание</p>
				{isEditing ? (
					<form ref={formRef} action={onSubmit} className='space-y-2'>
						<FormTextarea
							id='description'
							ref={textareaRef}
							className='w-full mt-2'
							placeholder='Добавьте описание к карточке...'
							defaultValue={data.description || undefined}
							errors={fieldErrors}
						/>
						<div className='flex items-center gap-x-2'>
							<FormSubmit>Сохранить</FormSubmit>
							<Button
								type='button'
								onClick={disableEditing}
								size='sm'
								variant='ghost'
							>
								Отмена
							</Button>
						</div>
					</form>
				) : (
					<div
						onClick={enableEditing}
						role='button'
						className='min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md'
					>
						{data.description || 'Добавьте описание к карточке...'}
					</div>
				)}
			</div>
		</div>
	)
}

Description.Skeletnon = function DescriptionSkeletnon() {
	return (
		<div className='flex items-start gap-x-3 w-full'>
			<Skeleton className='h-6 w-6 bg-neutral-200' />
			<div className='w-full'>
				<Skeleton className='w-24 h-6 mb-2 bg-neutral-200' />
				<Skeleton className='w-full h-[78px] bg-neutral-200' />
			</div>
		</div>
	)
}
