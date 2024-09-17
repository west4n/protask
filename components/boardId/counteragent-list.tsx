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
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetcher } from '@/lib/fetcher'
import { CardWithList } from '@/types'

interface Counteragent {
	id: number
	name: string
}

interface ExecutorProps {
	cardData: CardWithList
}

export const CounteragentSelect = ({ cardData }: ExecutorProps) => {
	const params = useParams()
	const queryClient = useQueryClient()

	// Получаем контрагентов
	const { data: counteragents } = useQuery<Counteragent[]>({
		queryKey: ['counteragents'],
		queryFn: () => fetcher('/api/counteragents'),
	})

	const { execute } = useAction(updateCard, {
		onSuccess: () => {
			toast.success('Контрагент изменен!')
			queryClient.invalidateQueries({
				queryKey: ['card', cardData.id],
			})
		},
		onError: error => {
			toast.error(error)
		},
	})

	// Обработка выбора контрагента
	const handleSelectChange = (counteragentName: string) => {
		execute({
			id: cardData.id,
			boardId: params.boardId as string,
			counteragent: counteragentName, // передаем имя контрагента
		})
	}

	return (
		<Select
			defaultValue={cardData.counteragent || ''}
			onValueChange={handleSelectChange}
		>
			<SelectTrigger className='w-full' onClick={e => e.stopPropagation()}>
				<SelectValue placeholder='Выбрать контрагента' />
			</SelectTrigger>
			<SelectContent onClick={e => e.stopPropagation()}>
				{counteragents?.map(counteragent => (
					<SelectItem key={counteragent.id} value={counteragent.name}>
						{counteragent.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
