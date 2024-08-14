'use client'

import { useState, useRef, ElementRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Plus, X } from 'lucide-react'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { useAction } from '@/hooks/use-action'
import { createList } from '@/actions/create-list'

import { ListWrapper } from './list-wrapper'
import { FormInput } from '@/components/form/form-input'
import { FormSubmit } from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export const ListForm = () => {
	const params = useParams()
	const router = useRouter()

	const { execute, fieldErrors } = useAction(createList, {
		onSuccess: data => {
			toast.success(`Список "${data.title}" создан! 😎`)
			disableEditing()
			router.refresh()
		},
		onError: error => {
			toast.error(error)
			disableEditing()
		},
	})

	const [isEditing, setIsEditing] = useState<boolean>(false)

	const formRef = useRef<ElementRef<'form'>>(null)
	const inputRef = useRef<ElementRef<'input'>>(null)
	const telegramRef = useRef<ElementRef<'input'>>(null)

	const enableEditing = () => {
		setIsEditing(true)
		setTimeout(() => {
			inputRef.current?.focus()
		})
	}

	const disableEditing = () => {
		setIsEditing(false)
	}

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			disableEditing()
		}
	}

	useEventListener('keydown', onKeyDown)
	useOnClickOutside(formRef, disableEditing)

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const boardId = formData.get('boardId') as string
		const telegramId = formData.get('telegramId') as string

		execute({ title, boardId, telegramId })
	}

	if (isEditing) {
		return (
			<ListWrapper>
				<form
					ref={formRef}
					className='w-full p-3 rounded-md bg-white space-y-4 shadow-md'
					action={onSubmit}
				>
					<FormInput
						ref={inputRef}
						errors={fieldErrors}
						id='title'
						className='text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition'
						placeholder='Введите название списка...'
					/>

					<FormInput
						ref={telegramRef}
						errors={fieldErrors}
						id='telegramId'
						className='text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition'
						placeholder='Введите id чата...'
					/>
					<input hidden value={params?.boardId} name='boardId' />
					<div className='flex items-center gap-x-1'>
						<FormSubmit>Добавить список</FormSubmit>
						<Button onClick={disableEditing} size='sm' variant='ghost'>
							<X className='size-5' />
						</Button>
					</div>
				</form>
			</ListWrapper>
		)
	}

	return (
		<ListWrapper>
			<button
				onClick={enableEditing}
				className='w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm'
			>
				<Plus className='size-4 mr-2' />
				Добавить список
			</button>
		</ListWrapper>
	)
}
