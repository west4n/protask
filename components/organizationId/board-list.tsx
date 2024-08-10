import { User2, HelpCircle } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import { db } from '@/lib/db'

import { Hint } from '@/components/hint'
import { FormPopover } from '@/components/form/form-popover'
import { Skeleton } from '@/components/ui/skeleton'

export const BoardList = async () => {
	const { orgId } = auth()

	if (!orgId) {
		return redirect('/select-org')
	}

	const boards = await db.board.findMany({
		where: {
			orgId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	return (
		<div className='space-y-4'>
			<div className='flex items-center font-semibold text-lg text-neutral-700'>
				<User2 className='size-6 mr-2' />
				Ваши доски
			</div>

			<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
				{boards.map(board => (
					<Link
						key={board.id}
						href={`/board/${board.id}`}
						className='group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden'
						style={{
							backgroundImage: `url(${board.imageThumbUrl})`,
						}}
					>
						<div className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition' />
						<p className='relative font-semibold text-white'>{board.title}</p>
					</Link>
				))}

				<FormPopover sideOffset={10} side='right'>
					<div
						role='button'
						className='aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition'
					>
						<p className='text-sm'>Создать доску</p>
						<span className='text-xs'>Осталось 5</span>
						<Hint
							sideOffset={40}
							description={`
              В бесплатных рабочих пространствах может быть до 5 открытых досок. Чтобы количество досок было неограниченным, обновите это рабочее пространство.
              `}
						>
							<HelpCircle className='absolute bottom-2 right-2 h-[14px] w-[14px]' />
						</Hint>
					</div>
				</FormPopover>
			</div>
		</div>
	)
}

BoardList.Skeleton = function SkeletonBoardList() {
	return (
		<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
			<Skeleton className='w-full h-full aspect-video p-2' />
			<Skeleton className='w-full h-full aspect-video p-2' />
			<Skeleton className='w-full h-full aspect-video p-2' />
			<Skeleton className='w-full h-full aspect-video p-2' />
			<Skeleton className='w-full h-full aspect-video p-2' />
			<Skeleton className='w-full h-full aspect-video p-2' />
			<Skeleton className='w-full h-full aspect-video p-2' />
			<Skeleton className='w-full h-full aspect-video p-2' />
		</div>
	)
}
