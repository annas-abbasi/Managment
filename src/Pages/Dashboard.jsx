import React, { useEffect, useState } from 'react'
import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { Members } from './dashboard/IndexDashboard';

export default function Dashboard() {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('/dashboard');

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname])

    return (
        <>
            <div className="mx-4 min-h-screen sm:mx-8 xl:mx-auto">
                <div className="grid grid-cols-8 sm:grid-cols-10">

                    <div className="min-h-screen col-span-2 hidden sm:block px-4 bg-white pt-8">
                        <h1 className="text-4xl font-semibold mb-8">Dashboard</h1>
                        <ul className='flex items-start flex-col gap-2'>

                            <div className={`flex items-center w-full gap-2 hover:bg-blue-100 rounded-md hover:text-blue-600 ${activeLink === '/dashboard' || activeLink === '/dashboard/Members' ? 'text-blue-700 bg-blue-100' : 'border-transparent'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ml-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
                                </svg>

                                <Link to="/dashboard/Members" className={`w-full cursor-pointerpx-2 py-4 font-semibold transition`}>Project Approvals</Link>
                            </div>

                            <div className={`flex items-center w-full gap-2 hover:bg-blue-100 rounded-md hover:text-blue-600 ${activeLink === '/dashboard/Assignee' ? 'text-blue-700 bg-blue-100 rounded-md' : 'border-transparent'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ml-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                                </svg>

                                <Link to="/dashboard/Assignee" className={`w-full cursor-pointer px-2 py-4 font-semibold transition`}>Assign</Link>
                            </div>

                            <div className={`flex items-center w-full gap-2 hover:bg-blue-100 rounded-md hover:text-blue-600 ${activeLink === '/dashboard/Time' ? 'text-blue-700 bg-blue-100 rounded-md' : 'border-transparent'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ml-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                                </svg>

                                <Link to="/dashboard/Time" className={`w-full cursor-pointer px-2 py-4 font-semibold transition`}>Project Details</Link>
                            </div>

                            <div className={`flex items-center w-full gap-2 hover:bg-blue-100 rounded-md hover:text-blue-600 ${activeLink === '/dashboard/Profile' ? 'text-blue-700 bg-blue-100 rounded-md' : 'border-transparent'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ml-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                </svg>

                                <Link to="/dashboard/Profile" className={`w-full cursor-pointer px-2 py-4 font-semibold transition`}>Users Profile</Link>
                            </div>

                            <div className={`flex items-center w-full gap-2 hover:bg-blue-100 rounded-md hover:text-blue-600 ${activeLink === '/dashboard/Account-Details' ? 'text-blue-700 bg-blue-100 rounded-md' : 'border-transparent'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ml-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
                                </svg>

                                <Link to="/dashboard/Account-Details" className={`w-full cursor-pointer px-2 py-4 font-semibold transition`}>Account Details</Link>
                            </div>

                            <div className={`flex items-center w-full gap-2 hover:bg-blue-100 rounded-md hover:text-blue-600 ${activeLink === '/dashboard/Edit-Profile' ? 'text-blue-700 bg-blue-100 rounded-md' : 'border-transparent'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ml-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>

                                <Link to="/dashboard/Edit-Profile" className={`w-full cursor-pointer px-2 py-4 font-semibold transition`}>Edit Profile</Link>
                            </div>

                            <div className={`flex items-center w-full gap-2 hover:bg-blue-100 rounded-md hover:text-blue-600 ${activeLink === '/dashboard/ProjectReview/SubProjectReview/:id' || activeLink === '/dashboard/ProjectReview' ? 'text-blue-700 bg-blue-100 rounded-md' : 'border-transparent'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ml-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>

                                <Link to="/dashboard/ProjectReview" className={`w-full cursor-pointer px-2 py-4 font-semibold transition`}>Project Review</Link>
                            </div>
                            {/* <Link to="/dashboard/Chat" className={`w-full mt-2 cursor-pointer border-l-2 hover:text-zinc-700 hover:bg-zinc-100 px-2 py-4 font-semibold transition ${activeLink === '/dashboard/Chat' ? 'border-l-zinc-700 text-zinc-700 bg-zinc-100' : 'border-transparent hover:border-l-zinc-700 hover:text-zinc-700'}`}>Chat Here</Link> */}
                        </ul >
                    </div >

                    <div className='w-full col-span-8 pt-5 pl-8 pr-10 border-t-0 border-l rounded-tl-md'>
                        <RouterItem />
                    </div>
                </div >
            </div >
        </>
    )
}

export const RouterItem = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Members />} />
            </Routes>
            <Outlet />
        </>
    );
}