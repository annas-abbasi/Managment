import React from 'react'
import Img1 from '../../Images/user1.jpg'
import Img3 from '../../Images/user.png'
import Img2 from '../../Images/user2.jpg'
import ChatUser from './ChatUser'

export default function Chat() {
    return (
        <div className='flex items-stretch h-full self-stretch gap-1'>
            <div class="overflow-hidden w-1/2 h-full flex flex-col justify-between">
                <div class="flex items-center gap-2 sticky top-0  border-b  border-gray-300 bg-white py-2 text-left text-sm  text-gray-800">
                    <figure>
                        <img src={Img3} alt="user" className='w-10 h-10 rounded-full' />
                    </figure>
                    <h4 class=" inline-block py-1 text-left font-sans font-semibold normal-case">Lara Abegnale</h4>
                </div>
                <div class="flex-grow px-4 pt-8 text-left text-gray-700">
                    <div class="relative mb-6 text-center">
                        <span class="relative bg-white px-2 text-sm text-gray-600">28 June, 2022</span>
                    </div>

                    <div class="relative mb-6 text-left">
                        <div class="text-gray-700">
                            <div class="absolute inset-x-0 top-0">
                                <img src={Img1} alt="" class="float-right inline-block h-6 w-6 sm:h-10 sm:w-10 rounded-full" />
                            </div>
                            <div class="relative float-right mr-8 sm:mr-12 inline-block rounded-md bg-blue-700 py-3 px-4 text-white">
                                <p class="text-sm">Hi, John</p>
                            </div>
                        </div>
                        <div class="clear-both flex text-gray-700"></div>
                    </div>

                    <div class="relative mb-6 text-left -ml-4">
                        <div class="text-gray-700">
                            <div class="absolute top-0 left-0">
                                <img src={Img2} alt="" class="float-right inline-block h-6 w-6 sm:h-10 sm:w-10 rounded-full" />
                            </div>
                            <div class="relative float-left ml-8 sm:ml-12 inline-block rounded-md bg-gray-200 py-3 px-4">
                                <p class="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quia optio accusamus.</p>
                            </div>
                        </div>
                        <div class="clear-both flex text-gray-700"></div>
                    </div>

                </div>
                <div class="mt-4 flex items-start border-t border-gray-300 sm:py-1 sm:pt-4 sm:pb-4 py-4 text-left  text-gray-700">
                    <textarea cols="1" rows="3" placeholder="Your Message" class="custom-scrollbar mr-4 w-full flex-1 cursor-text resize-none whitespace-pre-wrap rounded-md bg-white text-sm py-2 sm:py-0 font-normal text-gray-600 opacity-70 shadow-none outline-none focus:text-gray-600 focus:opacity-100"></textarea>
                    <button class="relative  inline-flex h-10 w-auto flex-initial cursor-pointer items-center justify-center self-center  rounded-md bg-blue-700 px-6 text-center align-middle text-sm font-medium text-white outline-none focus:ring-2">Send</button>
                </div>

            </div>
            <div className='w-1/2'>
                <ChatUser />
            </div>
        </div>
    )
}
