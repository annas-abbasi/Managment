import React, { useContext, useEffect, useState } from 'react'
import Img1 from '../../Images/user.png'
import axios from 'axios';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

export default function ProjectReview() {
    const { id } = useParams()
    const [tasks, setTasks] = useState([]);
    const [activeLink, setActiveLink] = useState('/dashboard/Profile/ViewProfile');
    const location = useLocation();
    const { userId } = useContext(AuthContext);
    console.log("This is the AuthContext:", userId)
    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname])

    const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${serverApi}/tasks`);
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        fetchTasks();
    }, [serverApi, id]);

    // const seperateData = (e) => {
    //     return e.split(" ").map((j) => j.charAt(0).toUpperCase() + j.slice(1)).join(" ")
    // }

    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`${serverApi}/delete/${taskId}`);
            setTasks(tasks.filter(task => task.userName !== taskId))
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    return (
        <>
            <main className='w-full'>
                {activeLink === '/dashboard/ProjectReview' && (
                    <div className='w-full grid grid-cols-3 gap-5 mb-7 gap-y-10'>
                        {tasks.map((task, index) => (
                            <div key={index} className='flex items-center flex-col gap-4 px-4 py-6 bg-white border shadow-md rounded-md'>
                                <div className='border-b w-full flex items-center justify-between text-gray-800'>
                                    <p>21 Dec 2021</p>
                                    <p>Abdullah Hassan</p>
                                </div>
                                <div className='flex items-center self-stretch flex-col gap-2 border-b px-4 py-6  w-full'>
                                    <h2 className='font-semibold text-4xl text-gray-700 text-center h-20'>{task.title}</h2>
                                    <div className='flex items-center gap-2 mt-4 flex-col h-auto justify-end mb-4'>
                                        <p className='text-gray-800 text-justify'>{task.task}</p>
                                        <img src={Img1} alt="user" className='w-8 h-8 rounded-full' />
                                    </div>
                                    <div className='grid grid-cols-2 items-start justify-between w-full gap-y-6'>
                                        <div className='flex items-center gap-2'>
                                            <h2 className='text-gray-600 font-semibold'>Budget $:</h2>
                                            <p className='text-gray-600'>{task.budget}</p>
                                        </div>
                                        <div className='flex items-center gap-2 justify-self-end'>
                                            <h2 className='text-gray-600 font-semibold'>Max Hours:</h2>
                                            <p className='text-gray-600'>{task.hour}</p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <h2 className='text-gray-600 font-semibold'>Time Limit:</h2>
                                            <p className='text-gray-600'>{task.timelimit}</p>
                                        </div>
                                        <div className='flex items-center gap-2 justify-self-end'>
                                            <h2 className='text-gray-600 font-semibold'>Time:</h2>
                                            <p className='text-gray-600'>{task.time}</p>
                                        </div>
                                    </div>
                                    <button className={`rounded-md cursor-default px-4 py-1 text-white bg-orange-600 mt-4 ${task.status === 'ended' ? 'bg-sky-600' : ''} ${task.status === 'Not Approved' ? 'bg-red-600' : ''}  ${task.status === "Approved" ? '!bg-green-600' : ''}`}>{task.status}</button>
                                </div>
                                {userId.userEmail === "admin@gmail.com" && userId.role === "user" ?
                                    (
                                        <div className='w-full flex items-center justify-between mt-auto text-gray-700'>
                                            <Link to={`/dashboard/ProjectReview/SubProjectReview/${task._id}`} className='hover:text-gray-900 transition-all cursor-pointer'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </Link>
                                            <span className='hover:text-gray-900 transition-all cursor-pointer' onClick={() => handleDelete(task._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </span>
                                        </div>
                                    ) :
                                    (
                                        <div className='w-full flex items-center justify-between mt-auto text-gray-700 h-4'></div>
                                    )

                                }

                            </div>
                        ))}
                    </div>
                )}
                <Outlet />
            </main>
        </>
    )
}







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function ProjectReview() {
//     const [tasks, setTasks] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [userMap, setUserMap] = useState({});

//     const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Fetch tasks and users concurrently
//                 const [tasksResponse, usersResponse] = await Promise.all([
//                     axios.get(`${serverApi}/tasks`),
//                     axios.get(`${serverApi}/registered-user`)
//                 ]);
//                 setTasks(tasksResponse.data);
//                 setUsers(usersResponse.data);

//                 // Create a map for users with their profile images
//                 const userMapping = usersResponse.data.reduce((acc, user) => {
//                     acc[user.name] = user.profileImage;
//                     // console.log('This is acc:', acc)
//                     return acc;
//                 }, {});

//                 setUserMap(userMapping);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, [serverApi, tasks]);

//     const handleDelete = async (taskId) => {
//         try {
//             await axios.delete(`${serverApi}/delete/${taskId}`);
//             setTasks(tasks.filter(task => task.userName !== taskId))
//         } catch (error) {
//             console.error('Error deleting task:', error);
//         }
//     }

//     return (
//         <>
//             <main className='grid grid-cols-3 gap-5 mb-7 gap-y-10'>
//                 {tasks.map((task, index) => {
//                     // const userImage = Object.values(userMap) || 'defaultImageURL';
//                     // const userImage = Object.values(userMap).map(url => url.startsWith('https://') ? url : url.startsWith('/') ? url.replace('/', 'http://localhost:3000/') : `https://${url}`) || 'defaultImageURL';
//                     // console.log('User Image:', userImage); // Debugging statement
//                     console.log('This is the UserMap:', userMap)

//                     return (

//                         <div key={index} className='flex items-center flex-col gap-4 px-4 py-6 bg-white border shadow-md rounded-md'>
//                             <div className='border-b w-full flex items-center justify-between text-gray-800'>
//                                 <p>21 Dec 2021</p>
//                                 <p>Abdullah Hassan</p>
//                             </div>
//                             <div className='flex items-center self-stretch flex-col gap-2 border-b px-4 py-6  w-full'>
//                                 <h2 className='font-semibold text-4xl text-gray-700 text-center h-20'>{task.title}</h2>
//                                 <div className='flex items-center gap-2 mt-4 flex-col h-auto justify-end'>
//                                     <p className='text-gray-800 text-justify'>{task.task}</p>
//                                     <div className='flex items-center gap-1'>
//                                         <img
//                                             // src={userMap[task.userId] || 'defaultImageURL'}
//                                             src={Object.values(userMap).map(url => url.startsWith('https://') ? url : url.startsWith('/') ? url.replace('/', 'http://localhost:3000/') : `https://${url}`) || 'defaultImageURL'}
//                                             alt="user"
//                                             className='w-8 h-8 rounded-full'
//                                         />
//                                     </div>
//                                     <p className='flex items-center gap-2'>{task.names}</p>
//                                     <p className='flex items-center gap-2'>{task.name}</p>
//                                 </div>
//                                 <button className={`rounded-md cursor-default px-4 py-1 text-white bg-orange-600 ${task.status === 'ended' ? 'bg-sky-600' : ''} ${task.status === 'Not Approved' ? 'bg-red-600' : ''} ${task.status === "Approved" ? '!bg-green-600' : ''}`}>{task.status}</button>
//                             </div>
//                             <div className='w-full flex items-center justify-between mt-auto text-gray-700'>
//                                 <span className='hover:text-gray-900 transition-all cursor-pointer'>
//                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
//                                     </svg>
//                                 </span>
//                                 <span className='hover:text-gray-900 transition-all cursor-pointer'>
//                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
//                                     </svg>
//                                 </span>
//                                 <span className='hover:text-gray-900 transition-all cursor-pointer'>
//                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
//                                     </svg>
//                                 </span>
//                                 <span className='Delete hover:text-gray-900 transition-all cursor-pointer' onClick={() => handleDelete(task._id)}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
//                                     </svg>
//                                 </span>
//                             </div>
//                         </div>
//                     )
//                 })}
//             </main>
//         </>
//     );
// }