'use client'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { Loader2 } from 'lucide-react'

import * as Clerk from '@clerk/elements/common'
import * as SignUp from '@clerk/elements/sign-up'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { cn } from '@/lib/utils'

export default function SignUpPage() {
	return (
		<div className='grid w-full grow items-center px-4 sm:justify-center'>
			<SignUp.Root>
				<Clerk.Loading>
					{isGlobalLoading => (
						<>
							<SignUp.Step name='start'>
								<Card className='w-full sm:w-96'>
									<CardHeader>
										<CardTitle>Создайте аккаунт</CardTitle>
										<CardDescription>
											Добро пожаловать! Создайте ваш аккаунт
										</CardDescription>
									</CardHeader>
									<CardContent className='grid gap-y-4'>
										<div className='grid gap-x-4'>
											<Clerk.Connection name='google' asChild>
												<Button
													size='sm'
													variant='outline'
													type='button'
													disabled={isGlobalLoading}
													className='w-full'
												>
													<Clerk.Loading scope='provider:google'>
														{isLoading =>
															isLoading ? (
																<Loader2 className='size-4 animate-spin' />
															) : (
																<>
																	<FcGoogle className='mr-2 size-4' />
																	Google
																</>
															)
														}
													</Clerk.Loading>
												</Button>
											</Clerk.Connection>
										</div>

										<p className='flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border'>
											или
										</p>

										<Clerk.Field name='emailAddress' className='space-y-2'>
											<Clerk.Input type='email' required asChild>
												<Input
													placeholder='john.doe@example.com'
													disabled={isGlobalLoading}
												/>
											</Clerk.Input>
											<Clerk.FieldError className='block text-sm text-destructive' />
										</Clerk.Field>
										<Clerk.Field name='password' className='space-y-2'>
											<Clerk.Input type='password' required asChild>
												<Input
													placeholder='Пароль'
													disabled={isGlobalLoading}
												/>
											</Clerk.Input>
											<Clerk.FieldError className='block text-sm text-destructive' />
										</Clerk.Field>
									</CardContent>
									<CardFooter>
										<div className='grid w-full gap-y-4'>
											<SignUp.Action submit asChild>
												<Button disabled={isGlobalLoading}>
													<Clerk.Loading>
														{isLoading => {
															return isLoading ? (
																<Loader2 className='size-4 animate-spin' />
															) : (
																'Продолжить'
															)
														}}
													</Clerk.Loading>
												</Button>
											</SignUp.Action>
											<Button variant='link' size='sm' asChild>
												<Link href='/sign-in'>Уже есть акканут? Войти</Link>
											</Button>
										</div>
									</CardFooter>
								</Card>
							</SignUp.Step>

							<SignUp.Step name='continue'>
								<Card className='w-full sm:w-96'>
									<CardHeader>
										<CardTitle>Продолжить регистрацию</CardTitle>
									</CardHeader>
									<CardContent>
										<Clerk.Field name='username' className='space-y-2'>
											<Clerk.Label>
												<Label>Ваше имя</Label>
											</Clerk.Label>
											<Clerk.Input type='text' required asChild>
												<Input
													placeholder='Ivan Kurski'
													disabled={isGlobalLoading}
												/>
											</Clerk.Input>
											<Clerk.FieldError className='block text-sm text-destructive' />
										</Clerk.Field>
									</CardContent>
									<CardFooter>
										<div className='grid w-full gap-y-4'>
											<SignUp.Action submit asChild>
												<Button disabled={isGlobalLoading}>
													<Clerk.Loading>
														{isLoading => {
															return isLoading ? (
																<Loader2 className='size-4 animate-spin' />
															) : (
																'Продолжить'
															)
														}}
													</Clerk.Loading>
												</Button>
											</SignUp.Action>
										</div>
									</CardFooter>
								</Card>
							</SignUp.Step>

							<SignUp.Step name='verifications'>
								<SignUp.Strategy name='email_code'>
									<Card className='w-full sm:w-96'>
										<CardHeader>
											<CardTitle>Подтвердите почту</CardTitle>
											<CardDescription>
												Воспользуйтесь ссылкой для подтверждения, отправленной
												на ваш электронный адрес
											</CardDescription>
										</CardHeader>
										<CardContent className='grid gap-y-4'>
											<div className='grid items-center justify-center gap-y-2'>
												<Clerk.Field name='code' className='space-y-2'>
													<Clerk.Label className='sr-only'>Почта</Clerk.Label>
													<div className='flex justify-center text-center'>
														<Clerk.Input
															type='otp'
															className='flex justify-center has-[:disabled]:opacity-50'
															autoSubmit
															render={({ value, status }) => {
																return (
																	<div
																		data-status={status}
																		className={cn(
																			'relative flex size-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
																			{
																				'z-10 ring-2 ring-ring ring-offset-background':
																					status === 'cursor' ||
																					status === 'selected',
																			}
																		)}
																	>
																		{value}
																		{status === 'cursor' && (
																			<div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
																				<div className='animate-caret-blink h-4 w-px bg-foreground duration-1000' />
																			</div>
																		)}
																	</div>
																)
															}}
														/>
													</div>
													<Clerk.FieldError className='block text-center text-sm text-destructive' />
												</Clerk.Field>
												<SignUp.Action
													asChild
													resend
													className='text-muted-foreground'
													fallback={({ resendableAfter }) => (
														<Button variant='link' size='sm' disabled>
															Не получили код подтверждения? Переслать (
															<span className='tabular-nums'>
																{resendableAfter}
															</span>
															)
														</Button>
													)}
												>
													<Button type='button' variant='link' size='sm'>
														Не получили код подтверждения? Переслать
													</Button>
												</SignUp.Action>
											</div>
										</CardContent>
										<CardFooter>
											<div className='grid w-full gap-y-4'>
												<SignUp.Action submit asChild>
													<Button disabled={isGlobalLoading}>
														<Clerk.Loading>
															{isLoading => {
																return isLoading ? (
																	<Loader2 className='size-4 animate-spin' />
																) : (
																	'Продолжить'
																)
															}}
														</Clerk.Loading>
													</Button>
												</SignUp.Action>
											</div>
										</CardFooter>
									</Card>
								</SignUp.Strategy>
							</SignUp.Step>
						</>
					)}
				</Clerk.Loading>
			</SignUp.Root>
		</div>
	)
}
