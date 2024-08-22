'use client'

import { useState, useRef, ElementRef } from 'react'
import { useParams } from 'next/navigation'
import { AlignLeft } from 'lucide-react'

import { CardWithList } from '@/types'

import { Skeleton } from '@/components/ui/skeleton'
import { FormEditor } from '@/components/form/form-editor'

interface DescriptionProps {
	data: CardWithList
}

export const Description = ({ data }: DescriptionProps) => {
	const params = useParams()

	const [isEditing, setIsEditing] = useState(false)

	const enableEditing = () => {
		setIsEditing(true)
	}

	const disableEditing = () => {
		setIsEditing(false)
	}

	return (
		<div className='flex items-start gap-x-3 w-full'>
			<AlignLeft className='size-5 mt-0.5 text-neutral-700' />
			<div className='w-full'>
				<p className='font-semibold text-neutral-700 mb-2'>Описание</p>
				<FormEditor
					data={data}
					params={{ boardId: params.boardId as string }}
					disableEditing={disableEditing}
					enableEditing={enableEditing}
					isEditing={isEditing}
				/>
			</div>
		</div>
	)
}

Description.Skeleton = function DescriptionSkeletnon() {
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
