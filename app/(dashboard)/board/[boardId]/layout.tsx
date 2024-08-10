import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'

import { BoardNavbar } from '@/components/boardId/board-navbar'

interface BoardIdLayoutProps {
	children: React.ReactNode
	params: { boardId: string }
}

export async function generateMetadata({ params }: BoardIdLayoutProps) {
	const { orgId } = auth()

	if (!orgId) {
		return {
			title: 'Доска',
		}
	}

	const board = await db.board.findUnique({
		where: {
			id: params.boardId,
			orgId,
		},
	})

	return {
		title: board?.title || 'Доска',
	}
}

const BoardIdLayout = async ({ children, params }: BoardIdLayoutProps) => {
	const { orgId } = auth()

	if (!orgId) {
		redirect('/select-org')
	}

	const board = await db.board.findUnique({
		where: {
			id: params.boardId,
			orgId,
		},
	})

	if (!board) {
		notFound()
	}

	return (
		<div
			className='relative h-full bg-no-repeat bg-cover bg-center'
			style={{
				backgroundImage: `url(${board.imageFullUrl})`,
			}}
		>
			<BoardNavbar data={board} />
			<div className='absolute inset-0 bg-black/10' />
			<main className='relative pt-28 h-full'>{children}</main>
		</div>
	)
}

export default BoardIdLayout
