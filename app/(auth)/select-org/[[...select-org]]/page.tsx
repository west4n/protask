import { OrganizationList } from '@clerk/nextjs'

const CreateOrganizationPage = () => {
	return (
		<OrganizationList
			hidePersonal
			afterSelectOrganizationUrl='/organization/:id'
			afterCreateOrganizationUrl='/organization/:id'
			appearance={{
				elements: {
					headerTitle: 'text-2xl font-semibold leading-none tracking-tight',
					headerSubtitle: 'text-sm text-muted-foreground',
				},
			}}
		/>
	)
}

export default CreateOrganizationPage
