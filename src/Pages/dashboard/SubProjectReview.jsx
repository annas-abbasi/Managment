import React, { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios';

export default function SubProjectReview({ navigate }) {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        names: '',
        title: '',
        task: ''
    })
    const [redirect, setRedirect] = useState(false);
    const [successMessage, setSuccessMessage] = useState('')
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${serverApi}/tasks/${id}`, formData)
            setSuccessMessage("Task Updated Successfully!")
            setTimeout(() => {
                setSuccessMessage('');
            }, 1000);
            setTimeout(() => {
                setRedirect(true);
            }, 1400);
        } catch (error) {
            console.log('This error is from Frontend HandleSubmit:', error)
        }
    }

    if (redirect) {
        return <Navigate to={navigate} />
    }

    return (
        <div>
            <main className='flex flex-col gap-10'>
                <header className='space-y-1 flex items-center gap-3 border-gray-300 border-b pb-4'>
                    <Link to={navigate} className='text-3xl text-zinc-800 -mb-2 underline cursor-pointer hover:text-zinc-600 transition-all'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </Link>
                    <h2 className='text-2xl '>Update Task</h2>
                </header>
                <form className='grid grid-cols-2 gap-y-16' onSubmit={handleSubmit}>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Names:</p>
                        <input
                            type="text"
                            name="names"
                            placeholder='Enter names separated by commas'
                            className='border w-11/12 rounded-md py-2 px-4'
                            value={formData.names}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Title:</p>
                        <input
                            type="text"
                            name="title"
                            placeholder='Assign Task Title'
                            className='border w-11/12 rounded-md py-2 px-4'
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Task:</p>
                        <textarea
                            name="task"
                            placeholder='Assign Task Description...'
                            rows={4}
                            className='border w-11/12 rounded-md py-2 px-4'
                            value={formData.task}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='space-y-1'>
                        <input
                            type="hidden"
                            name="time"
                        />
                    </div>


                    <button disabled={successMessage} className='py-2 px-4 mt-2 text-white text-base font-semibold bg-blue-600 rounded-md max-w-36 hover:text-blue-600 hover:bg-slate-50 hover:border-blue-600 border transition-all'
                        type="submit">Update Task</button>
                    {successMessage && (
                        <p className='text-green-600'>{successMessage}</p>
                    )}
                </form>
            </main>
        </div>
    )
}