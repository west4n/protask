import { OrganizationProfile } from '@clerk/nextjs'

const SettingsPage = () => {
	return (
		<div className='w-full'>
			<OrganizationProfile
				appearance={{
					elements: {
						rootBox: {
							boxShadow: 'none',
							width: '100%',
						},
						cardBox: {
							border: '1px solid #e5e5e5',
							boxShadow: 'none',
							width: '100%',
						},
						navbar: {
							background: '#fff',
						},
					},
				}}
			/>
		</div>
	)
}

export default SettingsPage
