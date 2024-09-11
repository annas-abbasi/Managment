import React from 'react'
import { Link } from 'react-router-dom'

export default function ViewProfile({ navigate }) {
    return (
        <div>
            <div className='mb-10'>
                <Link to={navigate} className='text-3xl text-zinc-800 underline cursor-pointer hover:text-zinc-600 transition-all'>Go Back</Link>
            </div>
            <div>
                <h1 className='text-gray-800 text-3xl font-semibold'>Name Title</h1>
                <p className=''>example@gmail.com</p>
            </div>

            <section className='w-full grid grid-cols-2 gap-12 mt-8'>
                <div>
                    <h2 className='font-semibold text-gray-700 text-xl'>Phone No.</h2>
                    <p className='text-gray-600'>+123 0000 0000</p>
                </div>
                <div>
                    <h2 className='font-semibold text-gray-700 text-xl'>Gender</h2>
                    <p className='text-gray-600'>Male</p>
                </div>
                <div>
                    <h2 className='font-semibold text-gray-700 text-xl'>Date of Birth</h2>
                    <p className='text-gray-600'>12-Sept-2020</p>
                </div>
                <div>
                    <h2 className='font-semibold text-gray-700 text-xl'>Upwork</h2>
                    <p className='text-gray-600'>@example-Upwork.com</p>
                </div>
                <div>
                    <h2 className='font-semibold text-gray-700 text-xl'>Slack</h2>
                    <p className='text-gray-600'>@example-Slack.com</p>
                </div>
                <div>
                    <h2 className='font-semibold text-gray-700 text-xl'>Linkedin</h2>
                    <p className='text-gray-600'>@example-Linkedin.com</p>
                </div>
                <div>
                    <h2 className='font-semibold text-gray-700 text-xl'>Task Approved</h2>
                    <p className='text-gray-600'>08</p>
                </div>
                <div>
                    <h2 className='font-semibold text-gray-700 text-xl'>Task Not-Approved</h2>
                    <p className='text-gray-600'>2</p>
                </div>
            </section>
        </div>
    )
}
