'use client'

import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
	return (
		<div className='grid w-full grow items-center px-4 sm:justify-center'>
			<SignUp
				path='/sign-up'
				routing='path'
				signInUrl='/sign-in'
				fallbackRedirectUrl='/'
				forceRedirectUrl='/'
			/>
		</div>
	)
}
