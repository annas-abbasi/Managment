import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function TaskReview() {
  const [tasks, setTasks] = useState([]);
  const [timers, setTimers] = useState({});
  const intervalRefs = useRef({});

  const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${serverApi}/tasks`);
        const tasksData = response.data;
        setTasks(tasksData);

        const savedTimers = JSON.parse(localStorage.getItem('timers')) || {};

        const initialTimers = tasksData.reduce((acc, task) => {
          acc[task._id] = {
            time: savedTimers[task._id]?.time || 0,
            intervalId: null,
            ended: savedTimers[task._id]?.ended || false
          };
          return acc;
        }, {});
        setTimers(initialTimers);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [serverApi]);

  const handleStart = (taskId) => {
    if (!timers[taskId].ended && !intervalRefs.current[taskId]) {
      const intervalId = setInterval(() => {
        setTimers(prevTimers => {
          const newTimers = {
            ...prevTimers,
            [taskId]: { ...prevTimers[taskId], time: prevTimers[taskId].time + 1 }
          };
          localStorage.setItem('timers', JSON.stringify(newTimers));
          return newTimers;
        });
      }, 1000);
      intervalRefs.current[taskId] = intervalId;
    }
  };

  const handleStop = (taskId) => {
    clearInterval(intervalRefs.current[taskId]);
    intervalRefs.current[taskId] = null;
    setTimers(prevTimers => {
      const newTimers = {
        ...prevTimers,
        [taskId]: { ...prevTimers[taskId], intervalId: null }
      };
      localStorage.setItem('timers', JSON.stringify(newTimers));
      return newTimers;
    });
  };

  // const handleEnd = (taskId) => {
  //   clearInterval(intervalRefs.current[taskId]);
  //   intervalRefs.current[taskId] = null;
  //   setTimers(prevTimers => {
  //     const newTimers = {
  //       ...prevTimers,
  //       [taskId]: { ...prevTimers[taskId], intervalId: null, ended: true }
  //     };
  //     localStorage.setItem('timers', JSON.stringify(newTimers));
  //     return newTimers;
  //   });
  // };


  const handleEnd = (taskId) => {
    clearInterval(intervalRefs.current[taskId]);
    intervalRefs.current[taskId] = null;
    const taskTime = timers[taskId].time;

    // Save the ended task in localStorage
    const endedTasks = JSON.parse(localStorage.getItem('endedTasks')) || [];
    endedTasks.push({ taskId, time: taskTime });
    localStorage.setItem('endedTasks', JSON.stringify(endedTasks));

    setTimers(prevTimers => {
      const newTimers = {
        ...prevTimers,
        [taskId]: { ...prevTimers[taskId], intervalId: null, ended: true }
      };
      localStorage.setItem('timers', JSON.stringify(newTimers));
      return newTimers;
    });
  };



  // THIS IS SHOWING TIME IN SECONDS IN THE MEMBER COMPONENT....
  // const handleEnd = (taskId) => {
  //   clearInterval(intervalRefs.current[taskId]);
  //   intervalRefs.current[taskId] = null;
  //   const taskTime = timers[taskId].time;

  //   // Save the ended task in localStorage
  //   const endedTasks = JSON.parse(localStorage.getItem('endedTasks')) || [];
  //   endedTasks.push({ taskId, time: taskTime });
  //   localStorage.setItem('endedTasks', JSON.stringify(endedTasks));

  //   setTimers(prevTimers => {
  //     const newTimers = {
  //       ...prevTimers,
  //       [taskId]: { ...prevTimers[taskId], intervalId: null, ended: true }
  //     };
  //     localStorage.setItem('timers', JSON.stringify(newTimers));
  //     return newTimers;
  //   });
  // };



  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      Object.values(intervalRefs.current).forEach(clearInterval);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('timers', JSON.stringify(timers));
    });

    return () => {
      window.removeEventListener('beforeunload', () => {
        localStorage.setItem('timers', JSON.stringify(timers));
      });
    };
  }, [timers]);

  return (
    <>
      <div className="flex flex-col gap-6 mb-16">
        <header className='space-y-1 border-gray-300 border-b pb-4'>
          <h2 className='text-2xl '>Task Review</h2>
          <p className='text-gray-600 text-sm'>Check for your task's here.</p>
        </header>

        <div className="mt-6 overflow-hidden rounded-xl border shadow">
          <table className="min-w-full">
            <thead className="hidden lg:table-header-group border-b border-gray-200 bg-gray-100">
              <tr className="py-10">
                <td className="whitespace-normal py-4 text-base font-medium text-gray-900 sm:px-6">Name</td>
                <td className="whitespace-normal py-4 text-base font-medium text-green-600 sm:px-6">Title</td>
                <td className="whitespace-normal py-4 text-base font-medium text-blue-600 sm:px-6">Task</td>
                <td className="whitespace-normal py-4 text-base font-medium sm:px-6 text-red-500">Time</td>
                <td className="whitespace-normal py-4 text-base font-medium sm:px-6 text-red-500">Control</td>
              </tr>
            </thead>

            <tbody className="lg:border-gray-300">
              {tasks.map((task) => (
                <tr key={task._id} className='border-b border-gray-100'>
                  <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-500 sm:px-6">
                    {task.name}
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell text-justify">{task.title}</td>

                  <td className="whitespace-no-wrap py-4 px-6 text-sm text-gray-600 text-justify ">
                    {task.task}
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    {formatTime(timers[task._id]?.time || 0)}
                  </td>
                  <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell flex flex-col gap-3 space-y-2 border w-1/6">
                    <button className='py-2 px-4 min-w-10 w-full rounded-md bg-green-600 text-white font-semibold'
                      onClick={() => handleStart(task._id)}
                      disabled={timers[task._id]?.ended}>Start</button>
                    <button className='py-2 px-4 min-w-10 w-full rounded-md bg-blue-600 text-white font-semibold'
                      onClick={() => handleStop(task._id)}
                      disabled={timers[task._id]?.ended}>Stop</button>
                    <button className='py-2 px-4 min-w-10 w-full rounded-md bg-red-600 text-white font-semibold'
                      onClick={() => handleEnd(task._id)}>End</button>
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



// THE TIMER IS WORKING WHEN I CHANGE THE TAB OR OPENS NEW WINDOW...
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';

// export default function TaskReview() {
//   const [tasks, setTasks] = useState([]);
//   const [timers, setTimers] = useState({});
//   const intervalRefs = useRef({});

//   const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get(`${serverApi}/tasks`);
//         const tasksData = response.data;
//         setTasks(tasksData);

//         const initialTimers = tasksData.reduce((acc, task) => {
//           acc[task._id] = { time: 0, intervalId: null, ended: false };
//           return acc;
//         }, {});
//         setTimers(initialTimers);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };
//     fetchTasks();
//   }, [serverApi]);

//   const handleStart = (taskId) => {
//     if (!timers[taskId].ended && !intervalRefs.current[taskId]) {
//       const intervalId = setInterval(() => {
//         setTimers(prevTimers => ({
//           ...prevTimers,
//           [taskId]: { ...prevTimers[taskId], time: prevTimers[taskId].time + 1 }
//         }));
//       }, 1000);
//       intervalRefs.current[taskId] = intervalId;
//     }
//   };

//   const handleStop = (taskId) => {
//     clearInterval(intervalRefs.current[taskId]);
//     intervalRefs.current[taskId] = null;
//     setTimers(prevTimers => ({
//       ...prevTimers,
//       [taskId]: { ...prevTimers[taskId], intervalId: null }
//     }));
//   };

//   const handleEnd = (taskId) => {
//     clearInterval(intervalRefs.current[taskId]);
//     intervalRefs.current[taskId] = null;
//     setTimers(prevTimers => ({
//       ...prevTimers,
//       [taskId]: { ...prevTimers[taskId], intervalId: null, ended: true }
//     }));
//   };

//   const formatTime = (seconds) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   useEffect(() => {
//     return () => {
//       Object.values(intervalRefs.current).forEach(clearInterval);
//     };
//   }, []);

//   return (
//     <>
//       <div className="flex flex-col gap-6 mb-16">
//         <header className='space-y-1 border-gray-300 border-b pb-4'>
//           <h2 className='text-2xl '>Task Review</h2>
//           <p className='text-gray-600 text-sm'>Check for your task's here.</p>
//         </header>

//         <div className="mt-6 overflow-hidden rounded-xl border shadow">
//           <table className="min-w-full">
//             <thead className="hidden lg:table-header-group border-b border-gray-200 bg-gray-100">
//               <tr className="py-10">
//                 <td className="whitespace-normal py-4 text-base font-medium text-gray-900 sm:px-6">Name</td>
//                 <td className="whitespace-normal py-4 text-base font-medium text-green-600 sm:px-6">Title</td>
//                 <td className="whitespace-normal py-4 text-base font-medium text-blue-600 sm:px-6">Task</td>
//                 <td className="whitespace-normal py-4 text-base font-medium sm:px-6 text-red-500">Time</td>
//                 <td className="whitespace-normal py-4 text-base font-medium sm:px-6 text-red-500">Control</td>
//               </tr>
//             </thead>

//             <tbody className="lg:border-gray-300">
//               {tasks.map((task) => (
//                 <tr key={task._id} className='border-b border-gray-100'>
//                   <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-500 sm:px-6">
//                     {task.name}
//                   </td>

//                   <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{task.title}</td>

//                   <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
//                     {task.task}
//                   </td>

//                   <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
//                     {formatTime(timers[task._id]?.time || 0)}
//                   </td>
//                   <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell flex flex-col gap-3 space-y-2 border">
//                     <button className='py-2 px-4 min-w-16 w-full rounded-md bg-green-600 text-white font-semibold'
//                       onClick={() => handleStart(task._id)}
//                       disabled={timers[task._id]?.ended}>Start</button>
//                     <button className='py-2 px-4 min-w-16 w-full rounded-md bg-blue-600 text-white font-semibold'
//                       onClick={() => handleStop(task._id)}
//                       disabled={timers[task._id]?.ended}>Stop</button>
//                     <button className='py-2 px-4 min-w-16 w-full rounded-md bg-red-600 text-white font-semibold'
//                       onClick={() => handleEnd(task._id)}>End</button>
//                   </td>
//                 </tr>
//               ))}

//             </tbody>
//           </table>

//         </div>
//       </div>
//     </>
//   );
// }







// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function TaskReview() {
//   const [tasks, setTasks] = useState([]);
//   const [timers, setTimers] = useState({});

//   const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get(`${serverApi}/tasks`);
//         const tasksData = response.data;
//         setTasks(tasksData);

//         const initialTimers = tasksData.reduce((acc, task) => {
//           acc[task._id] = { time: 0, intervalId: null, ended: false };
//           return acc;
//         }, {});
//         setTimers(initialTimers);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };
//     fetchTasks();
//   }, [serverApi]);

//   const handleStart = (taskId) => {
//     if (!timers[taskId].ended && !timers[taskId].intervalId) {
//       const intervalId = setInterval(() => {
//         setTimers(prevTimers => ({
//           ...prevTimers, [taskId]: { ...prevTimers[taskId], time: prevTimers[taskId].time + 1 }
//         }));
//       }, 1000);
//       setTimers(prevTimers => ({
//         ...prevTimers, [taskId]: { ...prevTimers[taskId], intervalId }
//       }));
//     }
//   };

//   const handleStop = (taskId) => {
//     clearInterval(timers[taskId].intervalId);
//     setTimers(prevTimers => ({
//       ...prevTimers, [taskId]: { ...prevTimers[taskId], intervalId: null }
//     }));
//   };

//   const handleEnd = (taskId) => {
//     clearInterval(timers[taskId].intervalId);
//     setTimers(prevTimers => ({
//       ...prevTimers, [taskId]: { ...prevTimers[taskId], intervalId: null, ended: true }
//     }));
//   };

//   const formatTime = (seconds) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <>
//       <div className="flex flex-col gap-6 mb-16">
//         <header className='space-y-1 border-gray-300 border-b pb-4'>
//           <h2 className='text-2xl '>Task Review</h2>
//           <p className='text-gray-600 text-sm'>Check for your task's here.</p>
//         </header>

//         <div className="mt-6 overflow-hidden rounded-xl border shadow">
//           <table className="min-w-full">
//             <thead className="hidden lg:table-header-group border-b border-gray-200 bg-gray-100">
//               <tr className="py-10">
//                 <td className="whitespace-normal py-4 text-base font-medium text-gray-900 sm:px-6">Name</td>
//                 <td className="whitespace-normal py-4 text-base font-medium text-green-600 sm:px-6">Title</td>
//                 <td className="whitespace-normal py-4 text-base font-medium text-blue-600 sm:px-6">Task</td>
//                 <td className="whitespace-normal py-4 text-base font-medium sm:px-6 text-red-500">Time</td>
//                 <td className="whitespace-normal py-4 text-base font-medium sm:px-6 text-red-500">Control</td>
//               </tr>
//             </thead>

//             <tbody className="lg:border-gray-300">
//               {tasks.map((task) => (
//                 <tr key={task._id} className='border-b border-gray-100'>
//                   <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-500 sm:px-6">
//                     {task.name}
//                   </td>

//                   <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{task.title}</td>

//                   <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
//                     {task.task}
//                   </td>

//                   <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
//                     {formatTime(timers[task._id]?.time || 0)}
//                   </td>
//                   <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell flex flex-col gap-3 space-y-2 border">
//                     <button className='py-2 px-4 min-w-16 w-full rounded-md bg-green-600 text-white font-semibold'
//                       onClick={() => handleStart(task._id)}
//                       disabled={timers[task._id]?.ended}>Start</button>
//                     <button className='py-2 px-4 min-w-16 w-full rounded-md bg-blue-600 text-white font-semibold'
//                       onClick={() => handleStop(task._id)}
//                       disabled={timers[task._id]?.ended}>Stop</button>
//                     <button className='py-2 px-4 min-w-16 w-full rounded-md bg-red-600 text-white font-semibold'
//                       onClick={() => handleEnd(task._id)}>End</button>
//                   </td>
//                 </tr>
//               ))}

//             </tbody>
//           </table>

//         </div>
//       </div>
//     </>
//   );
// }