import React from 'react'
import Img1 from '../../Images/user.png'

export default function ChatUser() {
    return (
        <main className='relative overflow-hidden'>
            <header className='px-2 border-b pb-1'>
                <h2 className='font-semibold text-2xl text-gray-800'>All User</h2>
                <p className='text-sm text-gray-800'>select user for chat</p>
            </header>

            <section className='px-2 py-2 space-y-4 h-screen overflow-y-scroll custom-scrollbar'>

                <div className='flex items-start gap-2 border-b pb-3 cursor-pointer my-1 hover:opacity-70'>
                    <figure>
                        <img src={Img1} alt="user" className='w-10 h-10 rounded-full' />
                    </figure>
                    <div className=''>
                        <h5 className='text-base text-gray-700 font-semibold leading-5'>Asad</h5>
                        <p className='text-sm text-gray-600 tracking-tighter'>Hello There how</p>
                    </div>
                </div>

                <div className='flex items-start gap-2 border-b pb-3 cursor-pointer my-1 hover:opacity-70'>
                    <figure>
                        <img src={Img1} alt="user" className='w-10 h-10 rounded-full' />
                    </figure>
                    <div className=''>
                        <h5 className='text-base text-gray-700 font-semibold leading-5'>Qaser</h5>
                        <p className='text-sm text-gray-600 tracking-tighter'>Fine Here</p>
                    </div>
                </div>
            </section>

            <div className="h-10 absolute bottom-0 w-full bg-gray-200 blur-2xl"></div>
        </main>
    )
}
