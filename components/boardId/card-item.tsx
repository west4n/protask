'use client'

import { ElementRef, useRef, useState } from 'react'
import { Draggable } from '@hello-pangea/dnd'

import { Card } from '@prisma/client'
import { useParams } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAction } from '@/hooks/use-action'
import { updateCard } from '@/actions/update-card'

import { toast } from 'sonner'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FormTextarea } from '../form/form-textarea'
import { FormSubmit } from '../form/form-submit'
import { Separator } from '../ui/separator'
import { Actions } from '../modals/card-modal/actions'
import { CardWithList } from '@/types'
import { fetcher } from '@/lib/fetcher'
import { Executor } from './executor'
import { CounteragentSelect } from './counteragent-list'
import { DatePicker } from './date-picker'

interface CardItemProps {
	data: Card
	index: number
}

export const CardItem = ({ data, index }: CardItemProps) => {
	const params = useParams()
	const queryClient = useQueryClient()

	const [isExpanded, setIsExpanded] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [title, setTitle] = useState(data.title)

	const textareaRef = useRef<ElementRef<'textarea'>>(null)

	const { data: cardData } = useQuery<CardWithList>({
		queryKey: ['card', data.id],
		queryFn: () => fetcher(`/api/cards/${data.id}`),
	})

	const { execute } = useAction(updateCard, {
		onSuccess: data => {
			queryClient.setQueryData(['card', data.id], data)

			toast.success(`Карточка успешно переименована! 😎`)

			setTitle(data.title)
			setIsEditing(false)
		},
		onError: error => {
			toast.error(error)
		},
	})

	const onBlur = () => {
		textareaRef.current?.form?.requestSubmit()
	}

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const boardId = params.boardId as string

		if (title === data.title) {
			setIsEditing(false)
			return
		}

		execute({ title, boardId, id: data.id })
	}

	const handleTitleClick = (e: React.MouseEvent) => {
		if (!isExpanded) {
			return
		}

		e.stopPropagation()
		setIsEditing(true)
		setTimeout(() => textareaRef.current?.focus(), 0)
	}

	const handleToggleExpand = (e: React.MouseEvent) => {
		e.stopPropagation()

		if (isExpanded) setIsEditing(false)
		setIsExpanded(!isExpanded)
	}

	return (
		<Draggable draggableId={data.id} index={index}>
			{provided => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					role='button'
					className={cn(
						'border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm flex flex-1 justify-between [&[data-state=open]>svg]:rotate-180',
						isExpanded ? 'max-h-full items-start' : 'max-h-12 items-center'
					)}
				>
					<div className={cn(isExpanded ? '' : 'truncate')}>
						{isEditing ? (
							<div>
								<form action={onSubmit} className='w-[230px] max-h-full'>
									<FormTextarea
										id='title'
										defaultValue={title}
										onBlur={onBlur}
										ref={textareaRef}
										className='w-full'
									/>
									<FormSubmit className='mt-2'>Сохранить</FormSubmit>
								</form>
							</div>
						) : (
							<span
								onClick={handleTitleClick}
								className={isExpanded ? '' : 'cursor-pointer'}
							>
								{title}
							</span>
						)}
						{isExpanded && cardData && (
							<div className='mt-4 flex flex-col gap-y-2 z-50'>
								<div>
									<p className='mb-2 text-sm text-muted-foreground font-semibold'>
										Контрагенты
									</p>
									<CounteragentSelect cardData={cardData} />
								</div>
								<div>
									<p className='mb-2 text-sm text-muted-foreground font-semibold'>
										Исполнитель
									</p>
									<Executor cardData={cardData} />
								</div>
								<div>
									<p className='mb-2 text-sm text-muted-foreground font-semibold'>
										Дата
									</p>
									<DatePicker cardData={cardData} />
								</div>
							</div>
						)}
						{isExpanded && (
							<div className='mt-10'>
								<Separator className='my-2' />
								{!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
							</div>
						)}
					</div>
					<ChevronDown
						onClick={handleToggleExpand}
						className={cn(
							'size-4 shrink-0 transition-transform duration-200',
							isExpanded ? 'rotate-180' : 'rotate-0'
						)}
					/>
				</div>
			)}
		</Draggable>
	)
}
