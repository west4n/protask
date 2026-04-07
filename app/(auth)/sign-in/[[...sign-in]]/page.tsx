'use client'

import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
	return (
		<div className='grid w-full grow items-center px-4 sm:justify-center'>
			<SignIn
				path='/sign-in'
				routing='path'
				signUpUrl='/sign-up'
				fallbackRedirectUrl='/'
				forceRedirectUrl='/'
			/>
		</div>
	)
}

export default SignInPage
