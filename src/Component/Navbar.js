// import React from 'react'
import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    // const { user } = useContext(UserContext);

    const handleScroll = () => {
        const hScreen = window.scrollY;
        if (hScreen > 70) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    // LOGOUT FUNCTIONALITY

    // const { user, setUser } = useContext(UserContext);
    const { user, setUser } = useContext(AuthContext);
    const [redirect, setRedirect] = useState(false);

    const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH
    console.log(`${serverApi}/logout`)

    const userLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${serverApi}/logout`)
            localStorage.removeItem('Token');
            setUser(null);
            setRedirect(true);
        } catch (error) {
            console.log('Error from the userLogout React', error)
        }
    }
    if (redirect) {
        return <Navigate to={'/'} />
    }
    // LOGOUT FUNCTIONALITY

    return (
        <>
            {/* <!-- Main navigation container --> */}
            <div className='h-20'>
                <nav
                    className={`flex-no-wrap fixed z-10 flex w-full items-center justify-between bg-opacity-80 border-b transition-all backdrop-blur-md py-2 lg:flex-wrap lg:justify-start lg:py-4 ${scrolled ? "border-blue-200 bg-gray-800" : "border-transparent bg-white"}`}>
                    <div className="flex w-full flex-wrap items-center justify-between px-3">
                        {/* <!-- Hamburger button for mobile view --> */}
                        <button
                            className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                            type="button"
                            data-twe-collapse-init
                            data-twe-target="#navbarSupportedContent1"
                            aria-controls="navbarSupportedContent1"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            {/* <!-- Hamburger icon --> */}
                            <span
                                className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                        clipRule="evenodd" />
                                </svg>
                            </span>
                        </button>

                        {/* <!-- Collapsible navigation container --> */}
                        <div
                            className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
                            id="navbarSupportedContent1"
                            data-twe-collapse-item>
                            {/* <!-- Logo --> */}
                            <Link to={'/'}
                                className="mb-4 me-16 ms-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
                                href="/">
                                <img
                                    src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
                                    alt="TE Logo"
                                    loading="lazy"
                                    className='w-12 h-12'
                                />
                            </Link>
                            {/* <!-- Left navigation links --> */}
                            <ul
                                className="list-style-none me-auto space-x-6 flex flex-col ps-0 lg:flex-row"
                                data-twe-navbar-nav-ref>
                                <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                                    {/* <!-- Dashboard link --> */}
                                    <Link to={'/dashboard'}
                                        className={`transition duration-200 ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none hover:text-blue-600 font-semibold lg:px-2 ${scrolled ? 'text-white' : 'text-gray-700'}`}
                                        href="/"
                                        data-twe-nav-link-ref
                                    >Dashboard </Link>
                                </li>
                                {/* <!-- Team link --> */}
                                <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                                    <a
                                        className={`transition duration-200 ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none hover:text-blue-600 font-semibold lg:px-2 ${scrolled ? 'text-white' : 'text-gray-700'}`}
                                        href="/"
                                        data-twe-nav-link-ref
                                    >Team</a
                                    >
                                </li>
                                {/* <!-- Projects link --> */}
                                <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                                    <a
                                        className={`transition duration-200 ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none hover:text-blue-600 font-semibold lg:px-2 ${scrolled ? 'text-white' : 'text-gray-700'}`}
                                        href="/"
                                        data-twe-nav-link-ref
                                    >Projects</a
                                    >
                                </li>
                            </ul>
                            {/* <!-- Left links --> */}
                        </div>

                        {/* <!-- Right elements --> */}
                        <div className="relative flex items-center space-x-2">
                            {/* <!-- Icon --> */}
                            <a className={`me-4 ${scrolled ? 'text-white' : 'text-gray-600'} transition-all`} href="/">
                                <span className="[&>svg]:w-5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor">
                                        <path
                                            d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                    </svg>
                                </span>
                            </a>

                            {/* <!-- First dropdown container --> */}
                            <div
                                className="relative "
                                data-twe-dropdown-ref
                                data-twe-dropdown-alignment="end">
                                {/* <!-- First dropdown trigger --> */}
                                <a
                                    className={`me-4 flex items-center transition-all ${scrolled ? 'text-white' : 'text-gray-600'}`}
                                    href="/"
                                    id="dropdownMenuButton1"
                                    role="button"
                                    data-twe-dropdown-toggle-ref
                                    aria-expanded="false">
                                    {/* <!-- Dropdown trigger icon --> */}
                                    <span className="[&>svg]:w-5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                                                clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    {/* <!-- Notification counter --> */}
                                    <span
                                        className="absolute -mt-4 ms-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-gray-500"
                                    >1</span
                                    >
                                </a>
                                {/* <!-- First dropdown menu --> */}
                                <ul
                                    className="absolute -right-10 top-8 z-[1000] min-w-max list-none overflow-hidden rounded-md bg-white text-base shadow-lg px-1 py-2 flex flex-col w-32 border border-gray-400 gap-1"
                                    aria-labelledby="dropdownMenuButton1"
                                    data-twe-dropdown-menu-ref>
                                    {/* <!-- First dropdown menu items --> */}
                                    {user ? (
                                        <Link className='border-gray-300 px-2 py-2 rounded-md hover:bg-slate-100' onClick={userLogout}>Logout?</Link>
                                    ) : (
                                        <Link to={"/Signup"} className='px-2 py-2 rounded-md hover:bg-slate-100'>Signup</Link>
                                    )}
                                </ul>
                            </div>

                            {/* <!-- Second dropdown container --> */}
                            <div
                                className="relative"
                                data-twe-dropdown-ref
                                data-twe-dropdown-alignment="end">
                                {/* <!-- Second dropdown trigger --> */}
                                <a
                                    className="flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none mr-4"
                                    href="/"
                                    id="dropdownMenuButton2"
                                    role="button"
                                    data-twe-dropdown-toggle-ref
                                    aria-expanded="false">
                                    {/* <!-- User avatar --> */}
                                    <img
                                        src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                                        className="rounded-full h-10 w-10"
                                        alt=""
                                        loading="lazy" />
                                    {/* {user && (
                                        <p className={`ml-1 font-semibold text-gray-700 ${scrolled ? 'text-white' : 'text-gray-700'}`}>
                                            {user.charAt(0).toUpperCase() + user.slice(1, 3)}
                                            {user}
                                        </p>
                                        )} */}
                                    {user && typeof user === 'string' && (<p className={`ml-1 font-semibold text-gray-700 ${scrolled ? 'text-white' : 'text-gray-700'}`}>
                                        {user.charAt(0).toUpperCase() + user.slice(1, 3)}
                                    </p>)}
                                </a>
                                {/* <!-- Second dropdown menu --> */}
                                <ul
                                    className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
                                    aria-labelledby="dropdownMenuButton2"
                                    data-twe-dropdown-menu-ref>
                                    {/* <!-- Second dropdown menu items --> */}
                                    <li>
                                        <a
                                            className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                            href="/"
                                            data-twe-dropdown-item-ref
                                        >Action</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                            href="/"
                                            data-twe-dropdown-item-ref
                                        >Another action</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                            href="/"
                                            data-twe-dropdown-item-ref
                                        >Something else here</a
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- Right elements --> */}
                    </div>
                </nav>
            </div>

        </>
    );
};
