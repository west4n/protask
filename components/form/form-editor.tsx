'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { CardWithList } from '@/types'
import { useAction } from '@/hooks/use-action'
import { updateCard } from '@/actions/update-card'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { FormSubmit } from './form-submit'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

interface FormEditorProps {
	data: CardWithList
	params: {
		boardId: string
	}
	isEditing: boolean
	disableEditing: () => void
	enableEditing: () => void
}

export const FormEditor = ({
	data,
	params,
	isEditing,
	disableEditing,
	enableEditing,
}: FormEditorProps) => {
	const queryClient = useQueryClient()

	const editor = useEditor({
		extensions: [StarterKit],
		editable: isEditing,
		content: data.description || '',
		editorProps: {
			attributes: {
				class: cn(
					'prose prose-sm focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none min-h-[80px] max-w-[430px] rounded-md',
					isEditing &&
						'bg-background border border-input shadow-sm px-3 py-2 max-h-[400px] overflow-y-auto'
				),
			},
		},
		immediatelyRender: false,
	})

	const { execute } = useAction(updateCard, {
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

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const description = editor?.getHTML() || ''
		const boardId = params.boardId as string

		execute({ description, boardId, id: data.id })
	}

	return (
		<>
			{isEditing ? (
				<form onSubmit={onSubmit} className='space-y-2'>
					<EditorContent editor={editor} />
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
					className='min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md max-h-[435px] overflow-y-auto'
				>
					{data.description ? (
						<EditorContent editor={editor} />
					) : (
						<p>Нет описания</p>
					)}
				</div>
			)}
		</>
	)
}
