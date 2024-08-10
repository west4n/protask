interface AuthLayoutProps {
	children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
	return (
		<div className='bg-[url(/background.jpg)] bg-cover bg-bottom bg-no-repeat h-full flex justify-center items-center'>
			{children}
		</div>
	)
}

export default AuthLayout
