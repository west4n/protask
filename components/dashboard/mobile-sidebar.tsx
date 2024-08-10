'use client'

import { usePathname } from 'next/navigation'
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar'
import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Sidebar } from '@/components/dashboard/sidebar'

export const MobileSidebar = () => {
	const pathname = usePathname()
	const [isMounted, setIsMounted] = useState(false)

	const isOpen = useMobileSidebar(state => state.isOpen)
	const onOpen = useMobileSidebar(state => state.onOpen)
	const onClose = useMobileSidebar(state => state.onClose)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	useEffect(() => {
		onClose()
	}, [pathname, onClose])

	if (!isMounted) return null

	return (
		<>
			<Button
				onClick={onOpen}
				className='block md:hidden mr-2'
				variant='ghost'
				size='sm'
			>
				<Menu className='size-4' />
			</Button>

			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetTitle hidden>Mobile Menu</SheetTitle>
				<SheetContent side='left' className='p-2 pt-10'>
					<Sidebar storageKey='t-sidebar-mobile-state' />
				</SheetContent>
			</Sheet>
		</>
	)
}
