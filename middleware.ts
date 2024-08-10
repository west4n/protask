import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/'])

export default clerkMiddleware((auth, req) => {
	if (isProtectedRoute(req) && !auth().userId) {
		auth().redirectToSignIn({ returnBackUrl: req.url })
	}

	if (auth().userId && isProtectedRoute(req)) {
		let path = '/select-org'

		if (auth().orgId) {
			path = `/organization/${auth().orgId}`
		}

		const orgSelction = new URL(path, req.url)

		if (req.url !== orgSelction.href) {
			return NextResponse.redirect(orgSelction)
		}
	}

	if (
		auth().userId &&
		!auth().orgId &&
		req.nextUrl.pathname !== '/select-org'
	) {
		const orgSelection = new URL('/select-org', req.url)
		return NextResponse.redirect(orgSelection)
	}

	return NextResponse.next()
})

export const config = {
	matcher: [
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		'/(api|trpc)(.*)',
	],
}
