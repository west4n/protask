import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { siteConfig } from '@/config/site'

import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/components/modals/providers/modal-provider'

import { Toaster } from '@/components/ui/sonner'

import { customLocalization } from '@/constants/custom-localization'

import './globals.css'
import { QueryProvider } from '@/components/modals/providers/query-provider'

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: [
		{
			url: '/logo.svg',
			href: '/logo.svg',
		},
	],
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider afterSignOutUrl='/' localization={customLocalization}>
			<html lang='ru'>
				<body className={GeistSans.className}>
					<QueryProvider>
						<ModalProvider />
						<Toaster />
						{children}
					</QueryProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}
