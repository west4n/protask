import { useState } from 'react'
import { useAction } from '@/hooks/use-action'
import { useParams } from 'next/navigation'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'

import { updateCard } from '@/actions/update-card'
import { CardWithList } from '@/types'
import { cn } from '@/lib/utils'

import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { useQueryClient } from '@tanstack/react-query'

interface DatePickerProps {
	cardData: CardWithList
}

export const DatePicker = ({ cardData }: DatePickerProps) => {
	const params = useParams()
	const queryClient = useQueryClient()

	const [selectedDate, setSelectedDate] = useState<Date>()

	const { execute } = useAction(updateCard, {
		onSuccess: data => {
			toast.success('Дата изменена!')
			queryClient.invalidateQueries({
				queryKey: ['card', cardData.id],
			})
		},
		onError: error => {
			toast.error(error)
		},
	})

	const handleDateChange = (date: Date | undefined) => {
		setSelectedDate(date)
		execute({
			id: cardData.id,
			boardId: params.boardId as string,
			date: date,
		})
	}

	const cardDate = cardData.date ? new Date(cardData.date) : undefined
	const displayDate = selectedDate ?? cardDate ?? 'Выбрать дату'

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					className={cn(
						'w-full justify-start text-left font-normal',
						!cardData.date && 'text-muted-foreground'
					)}
				>
					<CalendarIcon className='size-4 mr-2' />
					{typeof displayDate === 'string'
						? displayDate
						: format(displayDate, 'dd.MM.yyyy')}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					locale={ru}
					mode='single'
					selected={selectedDate}
					onSelect={handleDateChange}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}
