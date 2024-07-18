import React from 'react'
import Analytics from './Analytics'
import { Link, Outlet, Route, Routes } from 'react-router-dom'
import Landing from './Landing'

export default function Dashboard() {
    return (
        <>

            <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
                <h1 className="border-b py-6 text-4xl font-semibold">Dashboard</h1>
                <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
                    <div className="relative my-4 w-56 sm:hidden">
                        <input className="peer hidden" type="checkbox" name="select-1" id="select-1" />
                        <label for="select-1" className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring">Notifications </label>
                        <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                        <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
                            <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Notifications</li>
                            <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Team</li>
                            <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Others</li>
                        </ul>
                    </div>

                    <div className="col-span-2 hidden sm:block">
                        <ul className='flex items-start flex-col gap-2'>
                            <Link to={"/dashboard/dashboard1"} className="mt-5 w-full cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 focus:text-blue-700 focus:border-l-blue-700 hover:text-blue-700">Teams</Link>
                            <Link to={"/dashboard/dashboard2"} className="w-full mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 focus:text-blue-700 focus:border-l-blue-700 hover:text-blue-700">Accounts</Link>
                            <Link to={"/dashboard/dashboard1"} className="w-full mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 focus:text-blue-700 focus:border-l-blue-700 hover:text-blue-700">Users</Link>
                            <Link to={"/dashboard/dashboard2"} className="w-full mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 focus:text-blue-700 focus:border-l-blue-700 hover:text-blue-700">Profile</Link>
                            <Link to={"/dashboard/dashboard1"} className="w-full mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 focus:text-blue-700 focus:border-l-blue-700 hover:text-blue-700">Billing</Link>
                            <Link to={"/dashboard/dashboard2"} className="w-full mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold text-black transition focus:border-l-blue-700 focus:text-blue-700 hover:text-blue-700">Notifications</Link>
                            <Link to={"/dashboard/dashboard1"} className="w-full mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 focus:text-blue-700 focus:border-l-blue-700">Integrations</Link>
                        </ul>
                    </div>

                    <div className='w-full col-span-8'>
                        {/* <Analytics /> */}
                        <RouterItem />
                    </div>

                    {/* <div className="col-span-8 overflow-hidden rounded-xl bg-gray-50 px-8 shadow">
                        <div className="border-b pt-4 pb-8">
                            <h1 className="py-2 text-2xl font-semibold">Notification settings</h1>
                            <p className="font- text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                        </div>
                        <div className="grid border-b py-6 sm:grid-cols-2">
                            <div className="">
                                <h2 className="text-lg font-semibold leading-4 text-slate-700">Comments</h2>
                                <p className="font- text-slate-600">Lorem ipsum dolor, Alias eligendi laboriosam magni reiciendis neque.</p>
                            </div>
                            <div className="mt-4 flex items-center sm:justify-end">
                                <div className="flex flex-col gap-3">
                                    <label for="push" className="relative inline-flex cursor-pointer items-center">
                                        <input type="checkbox" value="" id="push" className="peer sr-only" checked />
                                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Push</span>
                                    </label>
                                    <label for="email" className="relative inline-flex cursor-pointer items-center">
                                        <input type="checkbox" value="" id="email" className="peer sr-only" checked />
                                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Email</span>
                                    </label>
                                    <label for="sms" className="relative inline-flex cursor-pointer items-center">
                                        <input type="checkbox" value="" id="sms" className="peer sr-only" />
                                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">SMS</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="grid border-b py-6 sm:grid-cols-2">
                            <div className="">
                                <h2 className="text-lg font-semibold leading-4 text-slate-700">Reminders</h2>
                                <p className="font- text-slate-600">Lorem ipsum dolor, Alias eligendi laboriosam magni reiciendis neque.</p>
                            </div>
                            <div className="mt-4 flex items-center sm:justify-end">
                                <div className="flex flex-col gap-3">
                                    <label for="push" className="relative inline-flex cursor-pointer items-center">
                                        <input type="checkbox" value="" id="push" className="peer sr-only" />
                                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Push</span>
                                    </label>
                                    <label for="email" className="relative inline-flex cursor-pointer items-center">
                                        <input type="checkbox" value="" id="email" className="peer sr-only" checked />
                                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Email</span>
                                    </label>
                                    <label for="sms" className="relative inline-flex cursor-pointer items-center">
                                        <input type="checkbox" value="" id="sms" className="peer sr-only" />
                                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">SMS</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="grid border-b py-6 sm:grid-cols-2">
                            <div className="">
                                <h2 className="text-lg font-semibold leading-4 text-slate-700">Updates</h2>
                                <p className="font- text-slate-600">Lorem ipsum dolor, Alias eligendi laboriosam magni reiciendis neque.</p>
                            </div>
                            <div className="mt-4 flex items-center sm:justify-end">
                                <div className="flex flex-col gap-3">
                                    <label for="push" className="relative inline-flex cursor-pointer items-center">
                                        <input type="checkbox" value="" id="push" className="peer sr-only" />
                                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Push</span>
                                    </label>
                                    <label for="email" className="relative inline-flex cursor-pointer items-center">
                                        <input type="checkbox" value="" id="email" className="peer sr-only" />
                                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Email</span>
                                    </label>
                                    <label for="sms" className="relative inline-flex cursor-pointer items-center">
                                        <input type="checkbox" value="" id="sms" className="peer sr-only" />
                                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">SMS</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}


export const RouterItem = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Landing />} />
            </Routes>
            <Outlet />
        </>
    );
}