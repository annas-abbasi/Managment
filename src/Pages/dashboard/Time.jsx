import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Time() {
  const [tasks, setTasks] = useState([]);

  const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${serverApi}/tasks`);
        setTasks(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
          <p className="flex-1 text-base font-bold text-gray-900">Latest Payments</p>

          <div className="mt-4 sm:mt-0">
            <div className="flex items-center justify-start sm:justify-end">
              <div className="flex items-center">
                <label for="" className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900"> Sort by: </label>
                <select name="" className="sm: mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm">
                  <option className="whitespace-no-wrap text-sm">Recent</option>
                </select>
              </div>

              <button type="button" className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-center text-sm font-medium text-gray-800 shadow hover:bg-gray-100 focus:shadow">
                <svg className="mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" className=""></path>
                </svg>
                Export to CSV
              </button>
            </div>
          </div>
        </div> */}

        <header className='space-y-1 border-gray-300 border-b pb-4'>
          <h2 className='text-2xl '>Task Review</h2>
          <p className='text-gray-600 text-sm'>Check for your task's here.</p>
        </header>

        <div className="mt-6 overflow-hidden rounded-xl border shadow">
          <table className="min-w-full">
            <thead className="hidden lg:table-header-group border-b border-gray-200 bg-gray-100">
              <tr className="py-10">
                <td width="40%" className="whitespace-normal py-4 text-base font-medium text-gray-900 sm:px-6">Name</td>

                <td className="whitespace-normal py-4 text-base font-medium text-green-600 sm:px-6">Title</td>

                <td className="whitespace-normal py-4 text-base font-medium text-blue-600 sm:px-6">Task</td>

                <td className="whitespace-normal py-4 text-base font-medium sm:px-6 text-red-500">Time</td>
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
                    {task.time}
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








// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function Time() {
//   const [tasks, setTasks] = useState([]);


//   const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get(`${serverApi}/tasks`);
//         setTasks(response.data);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   return (
//     <div>
//       <h2 className='text-2xl'>Task List</h2>
//       <table className='table-auto w-full mt-4'>
//         <thead>
//           <tr>
//             <th className='px-4 py-2'>Name</th>
//             <th className='px-4 py-2'>Title</th>
//             <th className='px-4 py-2'>Task</th>
//             <th className='px-4 py-2'>Time</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.map((task) => (
//             <tr key={task._id}>
//               <td className='border px-4 py-2'>{task.name}</td>
//               <td className='border px-4 py-2'>{task.title}</td>
//               <td className='border px-4 py-2'>{task.task}</td>
//               <td className='border px-4 py-2'>{task.time}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
