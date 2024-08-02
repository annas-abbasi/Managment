import React, { useState } from 'react';
import axios from 'axios';

export default function Assignee() {
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        task: '',
        time: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${serverApi}/assign-task`, formData);
            setSuccessMessage('Task created successfully!');
            setErrorMessage('');
            setFormData({
                name: '',
                title: '',
                task: '',
                time: ''
            });
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            console.log(response)
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Error creating task');
            setSuccessMessage('');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    return (
        <>
            <main className='flex flex-col gap-10'>
                <header className='space-y-1 border-gray-300 border-b pb-4'>
                    <h2 className='text-2xl '>Create Task</h2>
                    <p className='text-gray-600 text-sm'>Create a new task here</p>
                </header>
                {successMessage && (
                    <div className='text-green-600 text-sm mb-4'>
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className='text-red-600 text-sm mb-4'>
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-y-16'>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Name:</p>
                        <input
                            type="text"
                            name="name"
                            placeholder='Name of Person to Assign Task'
                            className='border w-11/12 rounded-md py-2 px-4'
                            value={formData.name}
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
                        <input
                            type="text"
                            name="task"
                            placeholder='Assign Task'
                            className='border w-11/12 rounded-md py-2 px-4'
                            value={formData.task}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Time:</p>
                        <input
                            type="text"
                            name="time"
                            placeholder='Assign the Time Limit (HH:MM:SS)'
                            className='border w-11/12 rounded-md py-2 px-4'
                            value={formData.time}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className='py-2 px-4 mt-2 text-white text-base font-semibold bg-blue-600 rounded-md max-w-36 hover:text-blue-600 hover:bg-slate-50 hover:border-blue-600 border transition-all'
                        type="submit"
                    >
                        Send
                    </button>
                </form>
            </main>
        </>
    );
}


