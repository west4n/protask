import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const counteragents = await db.counteragent.findMany({
			orderBy: {
				id: 'asc',
			},
		})

		return NextResponse.json(counteragents)
	} catch (error) {
		return new NextResponse('Не удалось получить контрагентов', { status: 500 })
	}
}
