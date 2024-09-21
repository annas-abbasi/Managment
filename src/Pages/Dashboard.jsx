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
                {/* <h1 className=" py-6 text-4xl px-10 font-semibold bg-white border-b">Dashboard</h1> */}
                <div className="grid grid-cols-8 sm:grid-cols-10">

                    {/* <div className="relative w-56 sm:hidden">
                        <input className="peer hidden" type="checkbox" name="select-1" id="select-1" />

                        <label htmlFor="select-1" className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring">Notifications </label>

                        <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>

                        <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
                            <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Notifications</li>
                            <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Team</li>
                            <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Others</li>
                        </ul>
                    </div> */}

                    <div className="min-h-screen col-span-2 hidden sm:block px-4 bg-zinc-50 pt-8">
                        <h1 className="text-4xl font-semibold mb-8">Dashboard</h1>
                        <ul className='flex items-start flex-col'>
                            <Link to="/dashboard/Members" className={`mt-2 w-full cursor-pointer hover:text-zinc-700 border-l-2 px-2 py-4 font-semibold transition ${activeLink === '/dashboard' || activeLink === '/dashboard/Members' ? 'border-l-zinc-700 text-zinc-700 bg-zinc-100 rounded-r-md' : 'border-transparent hover:border-l-zinc-700'}`}>Project Approvals</Link>

                            <Link to="/dashboard/Assignee" className={`w-full mt-2 cursor-pointer border-l-2 px-2 py-4 rounded-r-md font-semibold transition ${activeLink === '/dashboard/Assignee' ? 'border-l-zinc-700 text-zinc-700 bg-zinc-100' : 'border-transparent hover:border-l-zinc-700 hover:bg-zinc-100 hover:text-zinc-700'}`}>Assign</Link>

                            <Link to="/dashboard/Time" className={`w-full mt-2 cursor-pointer hover:text-zinc-700 hover:bg-zinc-100 border-l-2 px-2 py-4 font-semibold transition ${activeLink === '/dashboard/Time' ? 'border-l-zinc-700 text-zinc-700 bg-zinc-100' : 'border-transparent hover:border-l-zinc-700 hover:text-zinc-700'}`}>Project Details</Link>

                            <Link to="/dashboard/Profile" className={`w-full mt-2 cursor-pointer hover:text-zinc-700 hover:bg-zinc-100 border-l-2 px-2 py-4 font-semibold transition ${activeLink === '/dashboard/Profile' || activeLink === '/dashboard/Profile/ViewProfile' ? 'border-l-zinc-700 text-zinc-700' : 'border-transparent hover:border-l-zinc-700 hover:text-zinc-700'}`}>Users Profile</Link>

                            {/* <Link to="/dashboard/ViewProfile" className={`w-full mt-2 cursor-pointer border-l-2 px-2 py-4 font-semibold transition ${activeLink === '/dashboard/ViewProfile' ? 'border-l-zinc-700 text-zinc-700' : 'border-transparent hover:border-l-zinc-700 hover:text-zinc-700'}`}>View Profile</Link> */}

                            <Link to="/dashboard/Account-Details" className={`w-full mt-2 cursor-pointer hover:text-zinc-700 hover:bg-zinc-100 border-l-2 px-2 py-4 font-semibold transition ${activeLink === '/dashboard/Account-Details' ? 'border-l-zinc-700 text-zinc-700 bg-zinc-100' : 'border-transparent hover:border-l-zinc-700 hover:text-zinc-700'}`}>Account Details</Link>

                            <Link to="/dashboard/Edit-Profile" className={`w-full mt-2 cursor-pointer border-l-2 px-2 hover:bg-zinc-100 py-4 font-semibold transition ${activeLink === '/dashboard/Edit-Profile' ? 'border-l-zinc-700 hover:text-zinc-700 text-zinc-700 bg-zinc-100' : 'border-transparent hover:border-l-zinc-700 hover:text-zinc-700'}`}>Edit Profile</Link>

                            <Link to="/dashboard/ProjectReview" className={`w-full mt-2 cursor-pointer hover:text-zinc-700 hover:bg-zinc-100 border-l-2 px-2 py-4 font-semibold transition ${activeLink === '/dashboard/ProjectReview' || activeLink === '/dashboard/ProjectReview/SubProjectReview/:id' ? 'border-l-zinc-700 text-zinc-700 bg-zinc-100' : 'border-transparent hover:border-l-zinc-700 hover:text-zinc-700'}`}>Project Review</Link>

                            {/* <Link to="/dashboard/Chat" className={`w-full mt-2 cursor-pointer border-l-2 hover:text-zinc-700 hover:bg-zinc-100 px-2 py-4 font-semibold transition ${activeLink === '/dashboard/Chat' ? 'border-l-zinc-700 text-zinc-700 bg-zinc-100' : 'border-transparent hover:border-l-zinc-700 hover:text-zinc-700'}`}>Chat Here</Link> */}
                        </ul>
                    </div>

                    <div className='w-full col-span-8 pt-5 pl-8 pr-10 border-t-0 border-l rounded-tl-md'>
                        <RouterItem />
                    </div>
                </div>
            </div>
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