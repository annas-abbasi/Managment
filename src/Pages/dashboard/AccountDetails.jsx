import React from 'react'

export default function AccountDetails() {
    return (
        <div className='flex items-center justify-center flex-col space-y-10 mb-10 mt-4'>
            <header className=''>
                <h2 className='text-gray-800 text-3xl font-semibold'>Account Details</h2>
            </header>
            <section className='grid grid-cols-2 gap-y-16 w-full'>
                <div className='space-y-1'>
                    <p className='text-lg font-semibold'>Change Name:</p>
                    <input type="text"
                        name="name"
                        placeholder='Enter Name here'
                        className='border w-11/12 rounded-md py-2 px-4'
                    />
                </div>
                <div className='space-y-1'>
                    <p className='text-lg font-semibold'>Change Email:</p>
                    <input type="text"
                        name="email"
                        placeholder='Enter Email here'
                        className='border w-11/12 rounded-md py-2 px-4'
                    />
                </div>
                <div className='space-y-1'>
                    <p className='text-lg font-semibold'>Old Password:</p>
                    <input type="text"
                        name="name"
                        placeholder='Enter Your Current Password Here'
                        className='border w-11/12 rounded-md py-2 px-4'
                    />
                </div>
                <div className='space-y-1'>
                    <p className='text-lg font-semibold'>New Password:</p>
                    <input type="text"
                        name="email"
                        placeholder='Enter Your New Password Here'
                        className='border w-11/12 rounded-md py-2 px-4'
                    />
                </div>
            </section>

            <section className='self-start pt-4 w-full'>
                <header className='mt-2'>
                    <h2 className='text-gray-800 text-2xl font-semibold'>Add further details to you Account:</h2>
                </header>
                <div className='grid grid-cols-2 gap-y-16 w-full text-gray-800 mt-6'>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Phone no:</p>
                        <input type="number"
                            name="phone"
                            placeholder='Add your number here.'
                            className='border w-11/12 rounded-md py-2 px-4'
                        />
                    </div>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Gender:</p>
                        <input type="text"
                            name="gender"
                            placeholder='Add your gender here.'
                            className='border w-11/12 rounded-md py-2 px-4'
                        />
                    </div>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Birthday:</p>
                        <input type="text"
                            name="birthday"
                            placeholder='Add your birthday here.'
                            className='border w-11/12 rounded-md py-2 px-4'
                        />
                    </div>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Upwork:</p>
                        <input type="text"
                            name="upwork"
                            placeholder='Add your upwork account here.'
                            className='border w-11/12 rounded-md py-2 px-4'
                        />
                    </div>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Slack:</p>
                        <input type="text"
                            name="slack"
                            placeholder='Add your slack account here.'
                            className='border w-11/12 rounded-md py-2 px-4'
                        />
                    </div>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Linkedin:</p>
                        <input type="text"
                            name="linkedin"
                            placeholder='Add your linkedin account here.'
                            className='border w-11/12 rounded-md py-2 px-4'
                        />
                    </div>
                </div>
            </section>
            <div className='self-start'>
                <button className='border bg-blue-600 text-white py-2 rounded-md hover:bg-slate-50 hover:text-gray-800 transition-all px-8'>Update Profile</button>
            </div>
        </div>
    )
}
