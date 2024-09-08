import React, { useEffect, useState } from 'react'
import Img3 from '../../Images/user.png'
import ChatUser from './ChatUser'

export default function Chat() {
    const [selectedUser, setSelectedUser] = useState({
        name: 'Lara Abegnale',
        image: Img3,
    });

    useEffect(() => {
        const savedUser = localStorage.getItem('selectedUser')
        if (savedUser) {
            setSelectedUser(JSON.parse(savedUser))
        }
    }, [selectedUser])

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        localStorage.setItem('selectedUser', JSON.stringify(user));
    };

    return (
        <div className='flex items-stretch h-full self-stretch gap-1'>
            <div className="overflow-hidden w-1/2 h-full flex flex-col justify-between">
                <div className="flex items-center gap-2 sticky top-0 border-b border-gray-300 bg-white py-2 text-left text-sm text-gray-800">
                    <figure>
                        <img src={selectedUser.image} alt="user" className='w-10 h-10 rounded-full' />
                    </figure>
                    <h4 className="inline-block py-1 text-left font-sans font-semibold normal-case">{selectedUser.name}</h4>
                </div>
                <div className="flex-grow px-4 pt-8 text-left text-gray-700">
                    {/* Chat content here */}
                </div>
                <div className="mt-4 flex items-start border-t border-gray-300 sm:py-1 sm:pt-4 sm:pb-4 py-4 text-left text-gray-700">
                    <textarea
                        cols="1"
                        rows="3"
                        placeholder="Your Message"
                        className="custom-scrollbar mr-4 w-full flex-1 cursor-text resize-none whitespace-pre-wrap rounded-md bg-white text-sm py-2 sm:py-0 font-normal text-gray-600 opacity-70 shadow-none outline-none focus:text-gray-600 focus:opacity-100"
                    ></textarea>
                    <button className="relative inline-flex h-10 w-auto flex-initial cursor-pointer items-center justify-center self-center rounded-md bg-blue-700 px-6 text-center align-middle text-sm font-medium text-white outline-none focus:ring-2">
                        Send
                    </button>
                </div>
            </div>

            <div className='w-1/2'>
                <ChatUser userSelect={handleUserSelect} />
            </div>
        </div>
    )
}