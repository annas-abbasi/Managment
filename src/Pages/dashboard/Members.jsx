import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Member() {
  const [tasks, setTasks] = useState([]);

  const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${serverApi}/tasks`);
        const tasksData = response.data;
        setTasks(tasksData);

      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [serverApi]);


  return (
    <>
      <div className="flex flex-col gap-6">
        <header className='space-y-1 border-gray-300 border-b pb-4'>
          <h2 className='text-2xl '>Task Review</h2>
          <p className='text-gray-600 text-sm'>Check for your task's here.</p>
        </header>

        <div className="mt-6 overflow-hidden rounded-xl border shadow">
          <table className="min-w-full">
            <thead className="hidden lg:table-header-group border-b border-gray-200 bg-gray-100">
              <tr className="py-10">
                <td className="whitespace-normal py-4 text-base font-medium text-gray-900 sm:px-6">Name</td>
                <td className="whitespace-normal py-4 text-base font-medium text-gray-600 sm:px-6">Title</td>
                <td className="whitespace-normal py-4 text-base font-medium text-gray-600 sm:px-6">Task</td>
                <td className="whitespace-normal py-4 text-base font-medium text-gray-600 sm:px-6 w-20">Approvals</td>
              </tr>
            </thead>

            <tbody className="lg:border-gray-300">
              {tasks.map((task) => (
                <tr key={task._id} className='border-b border-gray-100'>
                  <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-500 sm:px-6">
                    {task.name}
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{task.title}</td>

                  <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                    {task.task}
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    <div className='border w-fit ml-2 px-4 py-1 rounded-full border-green-700 bg-green-100 text-green-900'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    </div>
                    {/* <div className='border w-fit ml-2 px-4 py-1 rounded-full border-red-700 bg-red-100 text-red-900'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    </div> */}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}



