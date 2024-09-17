'use client'

import { createCounteragent } from '@/actions/create-counteragent'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useAction } from '@/hooks/use-action'
import { useState } from 'react'
import { toast } from 'sonner'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/lib/fetcher'

type Counteragent = {
	id: number
	index: number
	name: string
}
export const CounteragentTable = () => {
	const [name, setName] = useState('')
	const { execute, isLoading } = useAction(createCounteragent, {
		onSuccess: () => {
			toast.success('Контрагент успешно добавлен')
			setName('')
			refetch()
		},
		onError: error => {
			toast.error(error)
		},
	})

	const { data: counteragents, refetch } = useQuery<Counteragent[]>({
		queryKey: ['counteragents'],
		queryFn: () => fetcher('/api/counteragents'),
	})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!name.trim()) {
			toast.error('Имя контрагента обязательно')
			return
		}

		execute({ name })
	}

	return (
		<div>
			{/* Форма добавления контрагента */}
			<form onSubmit={handleSubmit} className='flex gap-2 mb-4'>
				<Input
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder='Введите имя контрагента'
				/>
				<Button type='submit' disabled={isLoading}>
					{isLoading ? 'Сохранение...' : 'Сохранить'}
				</Button>
			</form>

			{/* Таблица контрагентов */}
			<Table>
				<TableCaption>Контрагенты</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>№</TableHead>
						<TableHead className='w-full'>Контрагент</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{counteragents?.map((counteragent, index) => (
						<TableRow key={counteragent.id}>
							<TableCell className='font-medium'>{index + 1}</TableCell>
							<TableCell>{counteragent.name}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
