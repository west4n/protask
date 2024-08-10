import Image from 'next/image'
import Link from 'next/link'
import { Permanent_Marker } from 'next/font/google'

import { cn } from '@/lib/utils'

const font = Permanent_Marker({
	subsets: ['latin'],
	weight: ['400'],
})

export const Logo = () => {
	return (
		<Link href='/'>
			<div className='hover:opacity-75 transition items-center gap-x-2 hidden md:flex'>
				<Image src='/logo.svg' alt='Logo' height={30} width={30} />

				<p className={cn('text-2xl text-neutral-700 pb-1', font.className)}>
					ProTask
				</p>
			</div>
		</Link>
	)
}
