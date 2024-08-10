import { startCase } from 'lodash'
import { auth } from '@clerk/nextjs/server'

import { OrgControl } from '@/components/organizationId/org-control'

export async function generateMetadata() {
	const { orgSlug } = auth()

	return {
		title: startCase(orgSlug || 'Организация'),
	}
}

interface OrganizationIdLayoutProps {
	children: React.ReactNode
}

const OrganizationIdLayout = ({ children }: OrganizationIdLayoutProps) => {
	return (
		<>
			<OrgControl />
			{children}
		</>
	)
}

export default OrganizationIdLayout
