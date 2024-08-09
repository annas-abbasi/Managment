import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Member() {
  const [tasks, setTasks] = useState([]);
  const [crossvisibility, setCrossVisibility] = useState({});
  const [checkVisibility, setCheckVisibility] = useState({});
  const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;

  const handleCross = async (index, taskId) => {
    setCrossVisibility((i) => ({ ...i, [index]: true }));
    setCheckVisibility((i) => ({ ...i, [index]: false }));
    await updateStatus(taskId, 'Not Approved')
  };

  const handleCheck = async (index, taskId) => {
    setCheckVisibility((i) => ({ ...i, [index]: true }));
    setCrossVisibility((i) => ({ ...i, [index]: false }));
    await updateStatus(taskId, 'Approved')
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${serverApi}/tasks`);
        console.log(response)
        // const activeTasks = response.data.filter(task => !['approved', 'not-approved'].includes(task.status));
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [serverApi]);

  const updateStatus = async (taskVal, newStatus) => {
    try {
      await axios.put(`${serverApi}/tasks/${taskVal}/status`, { status: newStatus });
      console.log('This is the TaskVal parameter:', taskVal)
    } catch (error) {
      console.log('error from the updateStatus Function:', error)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-6 mb-12">
        <header className='space-y-1 border-gray-300 border-b pb-4'>
          <h2 className='text-2xl '>Ended Tasks</h2>
          <p className='text-gray-600 text-sm'>Tasks that have been completed.</p>
        </header>

        <div className="mt-6 overflow-hidden rounded-xl border shadow">
          <table className="min-w-full">
            <thead className="hidden lg:table-header-group border-b border-gray-200 bg-gray-100">
              <tr className="py-10">
                <td className="whitespace-normal py-4 text-base font-medium text-gray-900 sm:px-6">Name</td>
                <td className="whitespace-normal py-4 text-base font-medium text-gray-600 sm:px-6">Title</td>
                <td className="whitespace-normal py-4 text-base font-medium text-gray-600 sm:px-6">Task</td>
                <td className="whitespace-normal py-4 text-base font-medium text-gray-600 sm:px-6">Time</td>
                <td className="whitespace-normal py-4 text-base font-medium text-gray-600 sm:px-6">Approval</td>
              </tr>
            </thead>

            <tbody className="lg:border-gray-300">
              {tasks.map((task, index) => {
                return (
                  <tr key={index} className='border-b border-gray-100'>
                    <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-500 sm:px-6 border-r">
                      {task.name}
                    </td>
                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell text-justify border-r">
                      {task.title}
                    </td>
                    <td className="whitespace-no-wrap py-4 px-6 text-sm text-gray-600 text-justify border-r">
                      {task.task}
                    </td>
                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell border-r">
                      {task.time}
                    </td>

                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                      <div className='flex items-center gap-2'>
                        {(crossvisibility[index] || crossvisibility[index] === undefined) &&
                          <div onClick={() => handleCross(index, task._id)} className={`border flex items-center justify-center w-fit ml-2 px-4 py-1 rounded-full border-red-700 bg-red-100 text-red-900 cursor-pointer hover:opacity-50 transition-all ${crossvisibility[index] ? '!m-auto' : ''}`}>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                          </div>
                        }
                        {(checkVisibility[index] || checkVisibility[index] === undefined) &&
                          <div onClick={() => handleCheck(index, task._id)} className={`border w-fit ml-2 px-4 py-1 rounded-full border-green-700 bg-green-100 text-green-900 cursor-pointer hover:opacity-50 transition-all ${checkVisibility[index] ? '!m-auto' : ''}`}>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                          </div>
                        }
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}




// THIS IS ALL WORKING CODE
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function Member() {
//   const [endedTasks, setEndedTasks] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [crossvisibility, setCrossVisibility] = useState({});
//   const [checkVisibility, setCheckVisibility] = useState({});
//   const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;

//   const handleCross = async (index, taskId) => {
//     setCrossVisibility((i) => ({ ...i, [index]: true }));
//     setCheckVisibility((i) => ({ ...i, [index]: false }));

//     try {
//       const res = await axios.post(`${serverApi}/update-task-status`, {
//         taskId,
//         status: 'not-approved',
//       });
//       console.log('This is from the Member Response:', res)
//     } catch (error) {
//       console.error('Error updating task status:', error);
//     }
//   };

//   const handleCheck = async (index, taskId) => {
//     setCheckVisibility((i) => ({ ...i, [index]: true }));
//     setCrossVisibility((i) => ({ ...i, [index]: false }));

//     try {
//       await axios.post(`${serverApi}/update-task-status`, {
//         taskId,
//         status: 'approved',
//       });
//     } catch (error) {
//       console.error('Error updating task status:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get(`${serverApi}/tasks`);
//         const activeTasks = response.data.filter(task => !['approved', 'not-approved'].includes(task.status));
//         setTasks(activeTasks);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };
//     fetchTasks();
//   }, [serverApi]);

//   useEffect(() => {
//     const fetchEndedTasks = () => {
//       const storedEndedTasks = JSON.parse(localStorage.getItem('endedTasks')) || [];
//       setEndedTasks(storedEndedTasks);
//     };
//     fetchEndedTasks();
//   }, []);

//   const getTaskDetails = (taskId) => {
//     return tasks.find(task => task._id === taskId);
//   };

//   const formatTime = (seconds) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <>
//       <div className="flex flex-col gap-6 mb-12">
//         <header className='space-y-1 border-gray-300 border-b pb-4'>
//           <h2 className='text-2xl '>Ended Tasks</h2>
//           <p className='text-gray-600 text-sm'>Tasks that have been completed.</p>
//         </header>

//         <div className="mt-6 overflow-hidden rounded-xl border shadow">
//           <table className="min-w-full">
//             <thead className="hidden lg:table-header-group border-b border-gray-200 bg-gray-100">
//               <tr className="py-10">
//                 <td className="whitespace-normal py-4 text-base font-medium text-gray-900 sm:px-6">Name</td>
//                 <td className="whitespace-normal py-4 text-base font-medium text-gray-600 sm:px-6">Title</td>
//                 <td className="whitespace-normal py-4 text-base font-medium text-gray-600 sm:px-6">Task</td>
//                 <td className="whitespace-normal py-4 text-base font-medium text-gray-600 sm:px-6">Time</td>
//                 <td className="whitespace-normal py-4 text-base font-medium text-gray-600 sm:px-6">Approval</td>
//               </tr>
//             </thead>

//             <tbody className="lg:border-gray-300">
//               {endedTasks.map(({ taskId, time }, index) => {
//                 const task = getTaskDetails(taskId);
//                 console.log('This is the GetTaskDetail:', task)
//                 console.log('This is the Task:', taskId)
//                 if (!task) return null;
//                 return (
//                   <tr key={taskId} className='border-b border-gray-100'>
//                     <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-500 sm:px-6 border-r">
//                       {task.name}
//                     </td>
//                     <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell text-justify border-r">
//                       {task.title}
//                     </td>
//                     <td className="whitespace-no-wrap py-4 px-6 text-sm text-gray-600 text-justify border-r">
//                       {task.task}
//                     </td>
//                     <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell border-r">
//                       {formatTime(time)}
//                     </td>

//                     <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
//                       <div className='flex items-center gap-2'>
//                         {(crossvisibility[index] || crossvisibility[index] === undefined) &&
//                           <div onClick={() => handleCross(index, taskId)} className={`border flex items-center justify-center w-fit ml-2 px-4 py-1 rounded-full border-red-700 bg-red-100 text-red-900 cursor-pointer hover:opacity-50 transition-all ${crossvisibility[index] ? '!m-auto' : ''}`}>

//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
//                               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
//                             </svg>
//                           </div>
//                         }
//                         {(checkVisibility[index] || checkVisibility[index] === undefined) &&
//                           <div onClick={() => handleCheck(index, taskId)} className={`border w-fit ml-2 px-4 py-1 rounded-full border-green-700 bg-green-100 text-green-900 cursor-pointer hover:opacity-50 transition-all ${checkVisibility[index] ? '!m-auto' : ''}`}>

//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
//                               <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
//                             </svg>
//                           </div>
//                         }
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }




// THIS ONE IS OLD
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function Member() {
//   const [endedTasks, setEndedTasks] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [crossvisibility, setCrossVisibility] = useState({});
//   const [checkVisibility, setCheckVisibility] = useState({});

//   const handleCross = (index) => {
//     setCrossVisibility((i) => ({ ...i, [index]: true }))
//     setCheckVisibility((i) => ({ ...i, [index]: false }))
//   }

//   const handleCheck = (index) => {
//     setCheckVisibility((i) => ({ ...i, [index]: true }))
//     setCrossVisibility((i) => ({ ...i, [index]: false }))
//   }

//   const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get(`${serverApi}/tasks`);
//         const activeTasks = response.data.filter(task => !['approved', 'not-approved'].includes(task.status));
//         setTasks(activeTasks);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };
//     fetchTasks();
//   }, [serverApi]);

//   useEffect(() => {
//     const fetchEndedTasks = () => {
//       const storedEndedTasks = JSON.parse(localStorage.getItem('endedTasks')) || [];
//       setEndedTasks(storedEndedTasks);
//     };
//     fetchEndedTasks();
//   }, []);




//   const getTaskDetails = (taskId) => {
//     return tasks.find(task => task._id === taskId);
//   };

//   const formatTime = (seconds) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <>
//       <div className="flex flex-col gap-6 mb-12">
//         <header className='space-y-1 border-gray-300 border-b pb-4'>
//           <h2 className='text-2xl '>Ended Tasks</h2>
//           <p className='text-gray-600 text-sm'>Tasks that have been completed.</p>
//         </header>

//         <div className="mt-6 overflow-hidden rounded-xl border shadow">
//           <table className="min-w-full">
//             <thead className="hidden lg:table-header-group border-b border-gray-200 bg-gray-100">
//               <tr className="py-10">
//                 <td className="whitespace-normal py-4 text-base font-medium text-gray-900 sm:px-6">Name</td>
//                 <td className="whitespace-normal py-4 text-base font-medium text-gray-600 sm:px-6">Title</td>
//                 <td className="whitespace-normal py-4 text-base font-medium text-gray-600 sm:px-6">Task</td>
//                 <td className="whitespace-normal py-4 text-base font-medium text-gray-600 sm:px-6">Time</td>
//                 <td className="whitespace-normal py-4 text-base font-medium text-gray-600 sm:px-6">Approval</td>
//               </tr>
//             </thead>

//             <tbody className="lg:border-gray-300">
//               {endedTasks.map(({ taskId, time }, index) => {
//                 const task = getTaskDetails(taskId);
//                 if (!task) return null;
//                 return (
//                   <tr key={taskId} className='border-b border-gray-100'>
//                     <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-500 sm:px-6 border-r">
//                       {task.name}
//                     </td>
//                     <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell text-justify border-r">
//                       {task.title}
//                     </td>
//                     <td className="whitespace-no-wrap py-4 px-6 text-sm text-gray-600 text-justify border-r">
//                       {task.task}
//                     </td>
//                     <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell border-r">
//                       {formatTime(time)}
//                     </td>

//                     <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
//                       <div className='flex items-center gap-2'>
//                         {(crossvisibility[index] || crossvisibility[index] === undefined) &&
//                           <div onClick={() => handleCross(index, taskId)} className={`border flex items-center justify-center w-fit ml-2 px-4 py-1 rounded-full border-red-700 bg-red-100 text-red-900 cursor-pointer hover:opacity-50 transition-all ${crossvisibility[index] ? '!m-auto' : ''}`}>

//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
//                               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
//                             </svg>
//                           </div>
//                         }
//                         {(checkVisibility[index] || checkVisibility[index] === undefined) &&
//                           <div onClick={() => handleCheck(index, taskId)} className={`border w-fit ml-2 px-4 py-1 rounded-full border-green-700 bg-green-100 text-green-900 cursor-pointer hover:opacity-50 transition-all ${checkVisibility[index] ? '!m-auto' : ''}`}>

//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
//                               <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
//                             </svg>
//                           </div>
//                         }
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }