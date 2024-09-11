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
                <h1 className=" py-6 text-4xl px-10 font-semibold bg-gray-50">Dashboard</h1>
                <div className="grid grid-cols-8 sm:grid-cols-10">

                    <div className="relative w-56 sm:hidden">
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
                    </div>

                    <div className="min-h-screen col-span-2 hidden sm:block px-4 bg-gray-50">
                        <ul className='flex items-start flex-col gap-2'>
                            <Link to="/dashboard/Members" className={`mt-5 w-full cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${activeLink === '/dashboard' || activeLink === '/dashboard/Members' ? 'border-l-blue-700 text-blue-700' : 'border-transparent hover:border-l-blue-700 hover:text-blue-700'}`}>All Task</Link>

                            <Link to="/dashboard/Assignee" className={`w-full mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${activeLink === '/dashboard/Assignee' ? 'border-l-blue-700 text-blue-700' : 'border-transparent hover:border-l-blue-700 hover:text-blue-700'}`}>Assign</Link>

                            <Link to="/dashboard/Time" className={`w-full mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${activeLink === '/dashboard/Time' ? 'border-l-blue-700 text-blue-700' : 'border-transparent hover:border-l-blue-700 hover:text-blue-700'}`}>Task Review</Link>

                            <Link to="/dashboard/Profile" className={`w-full mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${activeLink === '/dashboard/Profile' ? 'border-l-blue-700 text-blue-700' : 'border-transparent hover:border-l-blue-700 hover:text-blue-700'}`}>Users Profile</Link>

                            <Link to="/dashboard/Account-Details" className={`w-full mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${activeLink === '/dashboard/Account-Details' ? 'border-l-blue-700 text-blue-700' : 'border-transparent hover:border-l-blue-700 hover:text-blue-700'}`}>Account Details</Link>

                            <Link to="/dashboard/Edit-Profile" className={`w-full mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${activeLink === '/dashboard/Edit-Profile' ? 'border-l-blue-700 text-blue-700' : 'border-transparent hover:border-l-blue-700 hover:text-blue-700'}`}>Edit Profile</Link>

                            <Link to="/dashboard/ProjectReview" className={`w-full mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${activeLink === '/dashboard/ProjectReview' ? 'border-l-blue-700 text-blue-700' : 'border-transparent hover:border-l-blue-700 hover:text-blue-700'}`}>Project Review</Link>

                            <Link to="/dashboard/Chat" className={`w-full mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${activeLink === '/dashboard/Chat' ? 'border-l-blue-700 text-blue-700' : 'border-transparent hover:border-l-blue-700 hover:text-blue-700'}`}>Chat Here</Link>
                        </ul>
                    </div>

                    <div className='w-full col-span-8 pt-5 pl-8 pr-10 border-t border-l rounded-tl-md'>
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