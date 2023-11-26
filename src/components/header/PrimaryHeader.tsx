import React from 'react'
import { useTheme } from "next-themes";
import MoonIcon from "@/components/icons/MoonIcon";
import SunIcon from "@/components/icons/SunIcon";
import Head from "next/head";
import UnstyledLink from '../links/UnstyledLink';
import { useSession, signIn, signOut } from "next-auth/react"

const PrimaryHeader = () => {
    const { resolvedTheme, theme, setTheme } = useTheme();
    const { data: session } = useSession()
    const { status } = useSession();


    return (
        <>
        {status === "authenticated" && <>
            <Head>
                <title>restaurant</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Restaurant</span>
                    </a>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="true">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <UnstyledLink
                                    href='/'
                                    openNewTab={false}
                                    className={'font-primary flex-1 text-[22px] font-semibold'}
                                >
                                    Home
                                </UnstyledLink>
                            </li>
                            <li>
                                <UnstyledLink
                                    href='/admindashboard'
                                    openNewTab={false}
                                    className={'font-primary flex-1 text-[22px] font-semibold'}
                                >
                                    Admin
                                </UnstyledLink>
                            </li>
                            <li>
                                <UnstyledLink
                                    href='/clientpreference'
                                    openNewTab={false}
                                    className={'font-primary flex-1 text-[22px] font-semibold'}
                                >
                                    Client Preferences
                                </UnstyledLink>
                            </li>
                            <li>
                                <UnstyledLink
                                    href='/restaurant'
                                    openNewTab={false}
                                    className={'font-primary flex-1 text-[22px] font-semibold'}
                                >
                                    Restaurants
                                </UnstyledLink>
                            </li>
                            <li>
                                <UnstyledLink
                                    href='/users'
                                    openNewTab={false}
                                    className={'font-primary flex-1 text-[22px] font-semibold'}
                                >
                                    Users
                                </UnstyledLink>
                            </li>
                            <li>
                                {session ? (
                                    <>
                                        Signed in as {session?.user?.name} <br />
                                        <button onClick={() => signOut()}>Sign out</button>
                                    </>
                                ) : (
                                    <UnstyledLink
                                        href='/auth/signin'
                                        openNewTab={false}
                                        className={'font-primary flex-1 text-[22px] font-semibold'}
                                    >
                                        Login
                                    </UnstyledLink>
                                )}
                            </li>

                            <li>
                                <button
                                    onClick={() => {
                                        setTheme(resolvedTheme === "light" ? "dark" : "light");
                                    }}
                                    type='button'
                                    className='rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700'>
                                    {theme === "light" ? <MoonIcon /> : <SunIcon />}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>}
        </>
    )
}

export default PrimaryHeader