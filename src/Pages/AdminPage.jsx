import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPage() {
    const [tasks, setTasks] = useState([]);

    const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${serverApi}/admin/tasks`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [serverApi]);

    const handleApprove = async (taskId, status) => {
        try {
            const response = await axios.post(
                `${serverApi}/admin/approve-task`,
                { taskId, status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === response.data._id ? response.data : task
                )
            );
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    return (
        <div className="flex flex-col gap-6 mb-16">
            <header className='space-y-1 border-gray-300 border-b pb-4'>
                <h2 className='text-2xl '>Admin Task Review</h2>
                <p className='text-gray-600 text-sm'>Approve or not approve tasks here.</p>
            </header>

            <div className="mt-6 overflow-hidden rounded-xl border shadow">
                <table className="min-w-full">
                    <thead className="hidden lg:table-header-group border-b border-gray-200 bg-gray-100">
                        <tr className="py-10">
                            <td className="whitespace-normal py-4 text-base font-medium text-gray-900 sm:px-6">Name</td>
                            <td className="whitespace-normal py-4 text-base font-medium text-gray-900 sm:px-6">Title</td>
                            <td className="whitespace-normal py-4 text-base font-medium text-gray-900 sm:px-6">Task</td>
                            <td className="whitespace-normal py-4 text-base font-medium sm:px-6 text-gray-900">Time</td>
                            <td className="whitespace-normal py-4 text-base font-medium sm:px-6 text-gray-900">Status</td>
                            <td className="whitespace-normal py-4 text-base font-medium sm:px-6 text-gray-900">Control</td>
                        </tr>
                    </thead>

                    <tbody className="lg:border-gray-300">
                        {tasks.map((task) => (
                            <tr key={task._id} className='border-b border-gray-100'>
                                <td className="whitespace-no-wrap py-4 text-sm font-semibold text-gray-500 sm:px-6 border-r min-w-32">
                                    {task.name}
                                </td>
                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 min-w-32 sm:px-6 lg:table-cell text-justify border-r">{task.title}</td>
                                <td className="whitespace-no-wrap py-4 px-6 text-sm text-gray-600 text-justify border-r">
                                    {task.task}
                                </td>
                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                                    {task.time}
                                </td>
                                <td className="whitespace-no-wrap py-4 px-6 text-sm text-gray-600 text-justify border-r">
                                    {task.status}
                                </td>
                                <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell flex flex-col gap-3 space-y-2 border w-1/6">
                                    <button
                                        className={`py-2 px-4 w-full rounded-md text-green-600 font-semibold border ${task.status === 'Approved' ? 'cursor-default' : 'cursor-pointer hover:bg-green-600 hover:text-white'}`}
                                        onClick={() => handleApprove(task._id, 'Approved')}
                                        disabled={task.status === 'Approved'}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className={`py-2 px-4 w-full rounded-md text-red-600 font-semibold border ${task.status === 'Not Approved' ? 'cursor-default' : 'cursor-pointer hover:bg-red-600 hover:text-white'}`}
                                        onClick={() => handleApprove(task._id, 'Not Approved')}
                                        disabled={task.status === 'Not Approved'}
                                    >
                                        Not Approve
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
