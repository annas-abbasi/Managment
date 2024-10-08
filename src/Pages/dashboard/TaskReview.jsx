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
            ended: task.status === 'ended',
            Approved: task.status === 'Approved',
            NotApproved: task.status === 'Not Approved',
            pending: task.status === 'pending',
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
    if (!timers[taskId].ended && !timers[taskId].Approved && !timers[taskId].NotApproved && !intervalRefs.current[taskId]) {
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

  const handleEnd = async (taskId) => {
    clearInterval(intervalRefs.current[taskId]);
    intervalRefs.current[taskId] = null;
    const taskTime = timers[taskId].time;
    const formattedTime = formatTime(taskTime);

    // Save the ended task in localStorage
    const endedTasks = JSON.parse(localStorage.getItem('endedTasks')) || [];
    endedTasks.push({ taskId, time: taskTime });
    localStorage.setItem('endedTasks', JSON.stringify(endedTasks));

    try {
      const response = await axios.post(`${serverApi}/end-task`, {
        taskId,
        time: formattedTime,
      });
      const updatedTask = response.data;

      // Update the tasks state with the new time and status
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === taskId ? { ...task, time: updatedTask.time, status: 'ended' } : task
        )
      );
    } catch (error) {
      console.error('Error ending task:', error);
    }

    setTimers(prevTimers => {
      const newTimers = {
        ...prevTimers,
        [taskId]: { ...prevTimers[taskId], intervalId: null, ended: true }
      };
      localStorage.setItem('timers', JSON.stringify(newTimers));
      return newTimers;
    });
  };


  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const currentIntervals = intervalRefs.current;
    return () => {
      Object.values(currentIntervals).forEach(clearInterval);
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


  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('timers', JSON.stringify(timers));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
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
            <thead className="hidden lg:table-header-group border-b border-gray-200 bg-zinc-600 text-white">
              <tr className="py-10">
                <td className="whitespace-normal py-4 text-base font-medium sm:px-6">Name</td>
                <td className="whitespace-normal py-4 text-base font-medium sm:px-6">Title</td>
                <td className="whitespace-normal py-4 text-base font-medium sm:px-6">Projects</td>
                <td className="whitespace-normal py-4 text-base font-medium sm:px-6">Time</td>
                <td className="whitespace-normal py-4 text-base font-medium sm:px-6">Control</td>
              </tr>
            </thead>

            <tbody className="lg:border-gray-300">
              {tasks.map((task, index) => (

                <tr key={task._id} className={`border-b border-gray-100 ${index % 2 === 1 ? "bg-slate-50" : "bg-white"}`}>
                  <td className="whitespace-no-wrap py-4 text-sm font-semibold text-gray-500 sm:px-6 border-r min-w-32">
                    {task.name}
                    {task.names.join(' / ')}
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 min-w-32 sm:px-6 lg:table-cell text-justify border-r">{task.title}</td>

                  <td className="whitespace-no-wrap py-4 px-6 text-sm text-gray-600 text-justify border-r">
                    {task.task}
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    {task.status === 'ended' || task.status === 'Not Approved' || task.status === 'Approved' ? task.time : formatTime(timers[task._id]?.time || 0)}
                  </td>

                  <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell flex flex-col gap-3 space-y-2 border w-1/6">
                    {timers[task._id]?.pending && !timers[task._id]?.ended &&
                      <div className='space-y-3'>
                        <button className={`py-2 px-4 min-w-10 w-full rounded-md bg-green-600 text-white font-semibold ${timers[task._id]?.ended || timers[task._id]?.NotApproved || timers[task._id]?.Approved ? "cursor-not-allowed" : "cursor-pointer hover:bg-white hover:text-green-600 border hover:border-green-600"}`}
                          onClick={() => handleStart(task._id)}
                          disabled={timers[task._id]?.ended}>Start</button>

                        <button className={`py-2 px-4 min-w-10 w-full rounded-md bg-blue-600 text-white font-semibold ${timers[task._id]?.ended || timers[task._id]?.NotApproved || timers[task._id]?.Approved ? "cursor-not-allowed" : "cursor-pointer hover:bg-white hover:text-blue-600 border hover:border-blue-600"}`}
                          onClick={() => handleStop(task._id)}
                          disabled={timers[task._id]?.ended}>Stop</button>

                        <button className={`py-2 px-4 min-w-10 w-full rounded-md bg-red-600 text-white font-semibold ${timers[task._id]?.ended || timers[task._id]?.NotApproved || timers[task._id]?.Approved ? "cursor-default" : "cursor-pointer hover:bg-white hover:text-red-600 border hover:border-red-600"}`}
                          onClick={() => handleEnd(task._id)}>End Task</button>
                      </div>
                    }
                    {!timers[task._id]?.pending &&
                      <button className={`py-2 px-4 w-full rounded-md text-red-600 font-semibold cursor-default`}
                      >Ended</button>
                    }
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