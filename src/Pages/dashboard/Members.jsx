import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Member() {
  const [tasks, setTasks] = useState([]);
  const [approvalStatus, setApprovalStatus] = useState('ended');
  const [crossvisibility, setCrossVisibility] = useState({});
  const [checkVisibility, setCheckVisibility] = useState({});
  const [admin, setIsAdmin] = useState(false);
  const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${serverApi}/tasks`);
        setTasks(response.data);

        const statuses = response.data.map((e) => e.status);
        setApprovalStatus(statuses);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    // FETCHING USER
    const fetchUser = async (e) => {
      try {
        const response = await axios.get(`${serverApi}/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` }
        })
        const user = response.data.user;

        if (user.userEmail === 'admin@gmail.com' && user.userName === 'admin') {
          setIsAdmin(true);
        }
        // console.log('This is Admin', admin)

      } catch (error) {
        console.log('This Error is from fetchUser:', error)
      }
    }

    fetchUser();
    fetchTasks();
  }, [serverApi]);

  // console.log('This is the AdminUser:', admin)
  const handleCross = async (index, taskId) => {
    if (!admin) return;
    setCrossVisibility((i) => ({ ...i, [index]: true }));
    setCheckVisibility((i) => ({ ...i, [index]: false }));
    await updateStatus(taskId, 'Not Approved');
    updateTaskStatus(index, 'Not Approved');
  };

  const handleCheck = async (index, taskId) => {
    if (!admin) return;
    setCheckVisibility((i) => ({ ...i, [index]: true }));
    setCrossVisibility((i) => ({ ...i, [index]: false }));
    await updateStatus(taskId, 'Approved');
    updateTaskStatus(index, 'Approved');
    console.log(index, 'Approved');
  };

  const updateTaskStatus = (index, newState) => {
    setTasks((i) => {
      const updateValue = [...i];
      updateValue[index].status = newState;
      return updateValue;
    });
  }

  const updateStatus = async (taskVal, newStatus) => {
    try {
      await axios.put(`${serverApi}/tasks/${taskVal}/status`, { status: newStatus });
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

        <div className="mt-6 overflow-hidden rounded-md border shadow">
          <table className="min-w-full">
            <thead className="hidden lg:table-header-group border-b border-gray-200 bg-zinc-600">
              <tr className="py-10">
                <td className="whitespace-normal py-4 text-base font-medium text-white sm:px-6">Name</td>
                <td className="whitespace-normal py-4 text-base font-medium text-white sm:px-6">Title</td>
                <td className="whitespace-normal py-4 text-base font-medium text-white sm:px-6">Projects</td>
                <td className="whitespace-normal py-4 text-base font-medium text-white sm:px-6">Time</td>
                <td className="whitespace-normal py-4 text-base font-medium text-white sm:px-6">Approval</td>
              </tr>
            </thead>

            <tbody className="lg:border-gray-300">
              {tasks.map((task, index) => {
                return (
                  <tr key={index} className={`border-b border-gray-100 ${index % 2 === 1 ? "bg-slate-50" : "bg-white"}`}>
                    <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-500 sm:px-6 border-r">
                      {task.name}
                      {task.names}
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
                        {admin && (approvalStatus[index] && approvalStatus[index] === 'ended') &&
                          <>
                            <div>
                              {(crossvisibility[index] || crossvisibility[index] === undefined) &&
                                <div onClick={() => handleCross(index, task._id)} className={`border w-fit ml-2 px-4 py-1 rounded-full border-red-700 hover:bg-red-100 text-red-900 cursor-pointer bg-white transition-all ${crossvisibility[index] ? '!m-auto' : ''}`}>

                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                  </svg>
                                </div>
                              }
                            </div>

                            <div>
                              {(checkVisibility[index] || checkVisibility[index] === undefined) &&
                                <div onClick={() => handleCheck(index, task._id)} className={`border w-fit ml-2 px-4 py-1 rounded-full border-green-700 hover:bg-green-100 text-green-900 cursor-pointer bg-white transition-all ${checkVisibility[index] ? '!m-auto' : ''}`}>

                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                  </svg>
                                </div>
                              }
                            </div>
                          </>
                        }
                        {!admin && (approvalStatus[index] && approvalStatus[index] === 'ended') && <p>Pending</p>}
                        {approvalStatus[index] === 'Approved' &&
                          <div>
                            {(checkVisibility[index] || checkVisibility[index] === undefined) &&
                              <div onClick={() => handleCheck(index, task._id)} className={`border w-fit ml-2 px-4 py-1 rounded-full border-green-700 hover:bg-green-100 text-green-900 cursor-pointer bg-white transition-all ${checkVisibility[index] ? '!m-auto' : ''}`}>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                              </div>
                            }
                          </div>
                        }
                        {approvalStatus[index] === 'Not Approved' &&
                          <div>
                            {(crossvisibility[index] || crossvisibility[index] === undefined) &&
                              <div onClick={() => handleCross(index, task._id)} className={`border w-fit ml-2 px-4 py-1 rounded-full border-red-700 hover:bg-red-100 text-red-900 cursor-pointer bg-white transition-all ${crossvisibility[index] ? '!m-auto' : ''}`}>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                              </div>
                            }
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
      </div >
    </>
  );
}