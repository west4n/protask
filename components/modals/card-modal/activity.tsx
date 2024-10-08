'use client'

import { ActivityItem } from '@/components/activity-item'
import { Skeleton } from '@/components/ui/skeleton'
import { AuditLog } from '@prisma/client'
import { ActivityIcon } from 'lucide-react'

interface ActivityProps {
	data: AuditLog[]
}

export const Activity = ({ data }: ActivityProps) => {
	return (
		<div className='flex items-start gap-x-3 w-full'>
			<ActivityIcon className='size-5 mt-0.5 text-neutral-700' />
			<div className='w-full'>
				<p className='font-semibold text-neutral-700 mb-2'>Активность</p>
				<ol className='mt-2 space-y-4'>
					{data.map(i => (
						<ActivityItem key={i.id} data={i} />
					))}
				</ol>
			</div>
		</div>
	)
}

Activity.Skeleton = function SkeletonActivity() {
	return (
		<div className='flex items-start gap-x-3 w-full'>
			<Skeleton className='size-6 bg-neutral-200' />
			<div className='w-full'>
				<Skeleton className='w-24 h-6 mb-2 bg-neutral-200' />
				<Skeleton className='w-full h-10 bg-neutral-200' />
			</div>
		</div>
	)
}
