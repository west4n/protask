import { Navbar } from '@/components/dashboard/navbar'

interface DashboardLayoutProps {
	children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
	return (
		<div className='h-full'>
			<Navbar />
			{children}
		</div>
	)
}

export default DashboardLayout
