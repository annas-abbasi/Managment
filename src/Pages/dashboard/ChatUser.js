import React from 'react'
import Img1 from '../../Images/user1.jpg'
import Img3 from '../../Images/user.png'
import Img2 from '../../Images/user2.jpg'

export default function ChatUser({ userSelect }) {
    const users = [
        { name: 'Asad', image: Img1, message: 'Hello There how' },
        { name: 'Qaser', image: Img2, message: 'Fine Here' },
        { name: 'Ali', image: Img3, message: 'What’s up?' }
    ];
    console.log(userSelect)

    return (
        <main className='relative overflow-hidden'>
            <header className='px-2 border-b pb-1'>
                <h2 className='font-semibold text-2xl text-gray-800'>All User</h2>
                <p className='text-sm text-gray-800'>select user for chat</p>
            </header>

            <section className='px-2 py-2 space-y-4 h-screen overflow-y-scroll custom-scrollbar'>

                {users.map((user, index) => {
                    return (
                        <div key={index} className='flex items-start gap-2 border-b pb-3 cursor-pointer my-1 hover:opacity-70' onClick={() => userSelect(user)}>
                            <figure>
                                <img src={user.image} alt="user" className='w-10 h-10 rounded-full' />
                            </figure>
                            <div className=''>
                                <h5 className='text-base text-gray-700 font-semibold leading-5'>{user.name}</h5>
                                <p className='text-sm text-gray-600 tracking-tighter'>{user.message}</p>
                            </div>
                        </div>
                    )
                })}
            </section>

            <div className="h-10 absolute bottom-0 w-full bg-gray-200 blur-2xl"></div>
        </main>
    )
}
