import { Plus } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import { ClerkLoading, ClerkLoaded } from '@clerk/nextjs'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { MobileSidebar } from '@/components/dashboard/mobile-sidebar'
import { FormPopover } from '@/components/form/form-popover'

export const Navbar = () => {
	return (
		<nav className='fixed z-50 top-0 w-full px-4 h-14 border-b shadow-sm bg-white flex items-center'>
			<MobileSidebar />

			<div className='flex items-center gap-x-4'>
				<div className='hidden md:flex'>
					<Logo />
				</div>

				<FormPopover align='start' side='bottom' sideOffset={18}>
					<Button
						variant='primary'
						size='sm'
						className='rounded-sm hidden md:block h-auto py-1.5 px-2'
					>
						Создать
					</Button>
				</FormPopover>
				<FormPopover>
					<Button variant='primary' className='rounded-sm block md:hidden'>
						<Plus className='size-4' />
					</Button>
				</FormPopover>
			</div>

			<div className='ml-auto flex items-center gap-x-2'>
				<ClerkLoading>
					<Loader2 className='size-7 animate-spin' />
				</ClerkLoading>

				<ClerkLoaded>
					<OrganizationSwitcher
						hidePersonal
						afterCreateOrganizationUrl='/organization/:id'
						afterSelectOrganizationUrl='/organization/:id'
						afterLeaveOrganizationUrl='/select-org'
						appearance={{
							elements: {
								rootBox: {
									display: 'flex',
									justifyContent: 'cetner',
									alignItems: 'center',
								},
								avatarBox: {
									height: 30,
									width: 30,
								},
							},
						}}
					/>
				</ClerkLoaded>
				<UserButton
					appearance={{
						elements: {
							avatarBox: {
								height: 30,
								width: 30,
							},
						},
					}}
				/>
			</div>
		</nav>
	)
}
