'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

const SignInPage = () => {
	return (
		<div className='grid w-full grow items-center px-4 sm:justify-center'>
			<SignIn.Root>
				<Clerk.Loading>
					{isGlobalLoading => (
						<>
							<SignIn.Step name='start'>
								<Card className='w-full sm:w-96'>
									<CardHeader>
										<CardTitle>Войти в ProTask</CardTitle>
										<CardDescription>
											С возвращением! Войдите, чтобы продолжить
										</CardDescription>
									</CardHeader>
									<CardContent className='grid gap-y-4'>
										<div>
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
																	<FcGoogle className='size-4 mr-2' />
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

										<Clerk.Field name='identifier' className='space-y-2'>
											<Clerk.Input type='email' required asChild>
												<Input
													placeholder='john.doe@exmaple.com'
													disabled={isGlobalLoading}
												/>
											</Clerk.Input>
											<Clerk.FieldError className='block text-sm text-destructive' />
										</Clerk.Field>
									</CardContent>

									<CardFooter>
										<div className='grid w-full gap-y-4'>
											<SignIn.Action submit asChild>
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
											</SignIn.Action>

											<Button variant='link' size='sm' asChild>
												<Link href='/sign-up'>Нет аккаунта? Регистрация</Link>
											</Button>
										</div>
									</CardFooter>
								</Card>
							</SignIn.Step>

							<SignIn.Step name='choose-strategy'>
								<Card className='w-full sm:w-96'>
									<CardHeader>
										<CardTitle>Использовать другой метод</CardTitle>
										<CardDescription>
											Возникли проблемы? Вы можете попробовать другой способ
											входа в систему
										</CardDescription>
									</CardHeader>

									<CardContent className='grid gap-y-4'>
										<SignIn.SupportedStrategy name='email_code' asChild>
											<Button
												type='button'
												variant='link'
												disabled={isGlobalLoading}
											>
												Выслать проверочный код
											</Button>
										</SignIn.SupportedStrategy>

										<SignIn.SupportedStrategy name='password' asChild>
											<Button
												type='button'
												variant='link'
												disabled={isGlobalLoading}
											>
												Пароль при регистрации
											</Button>
										</SignIn.SupportedStrategy>
									</CardContent>

									<CardFooter>
										<div className='grid w-full gap-y-4'>
											<SignIn.Action navigate='previous' asChild>
												<Button disabled={isGlobalLoading}>
													<Clerk.Loading>
														{isLoading => {
															return isLoading ? (
																<Loader2 className='size-4 animate-spin' />
															) : (
																'Вернуться назад'
															)
														}}
													</Clerk.Loading>
												</Button>
											</SignIn.Action>
										</div>
									</CardFooter>
								</Card>
							</SignIn.Step>

							<SignIn.Step name='verifications'>
								<SignIn.Strategy name='password'>
									<Card className='w-full sm:w-96'>
										<CardHeader>
											<CardTitle>Введите ваш пароль</CardTitle>
											<CardDescription>
												Введите ваш пароль который вы задавали при регистрации
											</CardDescription>
										</CardHeader>
										<CardContent className='grid gap-y-4'>
											<Clerk.Field name='password' className='space-y-2'>
												<Clerk.Label asChild>
													<Label>Пароль</Label>
												</Clerk.Label>
												<Clerk.Input type='password' asChild>
													<Input />
												</Clerk.Input>
												<Clerk.FieldError className='block text-sm text-destructive' />
											</Clerk.Field>
										</CardContent>
										<CardFooter>
											<div className='grid w-full gap-y-4'>
												<SignIn.Action submit asChild>
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
												</SignIn.Action>
												<SignIn.Action navigate='choose-strategy' asChild>
													<Button type='button' size='sm' variant='link'>
														Использовать другой метод
													</Button>
												</SignIn.Action>
											</div>
										</CardFooter>
									</Card>
								</SignIn.Strategy>

								<SignIn.Strategy name='email_code'>
									<Card className='w-full sm:w-96'>
										<CardHeader>
											<CardTitle>Проверьте свою почту</CardTitle>
											<CardDescription>
												Впишите пароль который пришел вам на почту
											</CardDescription>
										</CardHeader>
										<CardContent className='grid gap-y-4'>
											<Clerk.Field name='code'>
												<Clerk.Label className='sr-only'>
													Проверочный код
												</Clerk.Label>
												<div className='grid gap-y-2 items-center justify-center'>
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
													<Clerk.FieldError className='block text-sm text-destructive text-center' />
													<SignIn.Action
														asChild
														resend
														className='text-muted-foreground'
														fallback={({ resendableAfter }) => (
															<Button variant='link' size='sm' disabled>
																Не пришел провероный код? Переслать (
																<span className='tabular-nums'>
																	{resendableAfter}
																</span>
																)
															</Button>
														)}
													>
														<Button variant='link' size='sm'>
															Не пришел провероный код? Переслать
														</Button>
													</SignIn.Action>
												</div>
											</Clerk.Field>
										</CardContent>
										<CardFooter>
											<div className='grid w-full gap-y-4'>
												<SignIn.Action submit asChild>
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
												</SignIn.Action>
												<SignIn.Action navigate='choose-strategy' asChild>
													<Button size='sm' variant='link'>
														Использовать другой метод
													</Button>
												</SignIn.Action>
											</div>
										</CardFooter>
									</Card>
								</SignIn.Strategy>
							</SignIn.Step>
						</>
					)}
				</Clerk.Loading>
			</SignIn.Root>
		</div>
	)
}

export default SignInPage
