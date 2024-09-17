import { Info } from '@/components/organizationId/info'
import { Separator } from '@/components/ui/separator'
import { ActivityList } from './_components/activity-list'
import { Suspense } from 'react'
import { CounteragentTable } from '@/components/counteragent-table'

const ActivityPage = () => {
	return (
		<div className='w-full'>
			<CounteragentTable />
		</div>
	)
}

export default ActivityPage
