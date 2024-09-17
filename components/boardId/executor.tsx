'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useAction } from '@/hooks/use-action'
import { updateCard } from '@/actions/update-card'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { EXECUTOR } from '@prisma/client'
import { CardWithList } from '@/types'
import { useQueryClient } from '@tanstack/react-query'

interface ExecutorProps {
	cardData: CardWithList
}

export const Executor = ({ cardData }: ExecutorProps) => {
	const params = useParams()
	const queryClient = useQueryClient()

	const { execute } = useAction(updateCard, {
		onSuccess: data => {
			toast.success('Исполнитель изменен!')
			queryClient.invalidateQueries({
				queryKey: ['card', cardData.id],
			})
		},
		onError: error => {
			toast.error(error)
		},
	})

	const handleSelectChange = (value: EXECUTOR) => {
		execute({
			id: cardData.id,
			boardId: params.boardId as string,
			executor: value,
		})
	}

	return (
		<Select defaultValue={cardData.executor} onValueChange={handleSelectChange}>
			<SelectTrigger className='w-full' onClick={e => e.stopPropagation()}>
				<SelectValue placeholder='Выбрать исполнителя' />
			</SelectTrigger>
			<SelectContent onClick={e => e.stopPropagation()}>
				<SelectItem value={EXECUTOR.NOTHING}>Нету</SelectItem>
				<SelectItem value={EXECUTOR.ARTEM}>Артём</SelectItem>
				<SelectItem value={EXECUTOR.ANDREY}>Андрей</SelectItem>
			</SelectContent>
		</Select>
	)
}
