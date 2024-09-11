import axios from 'axios';
import React, { useEffect, useState } from 'react'
import user from '../../Images/user.png'

export default function UserProfile() {
  const [tasks, setTasks] = useState([]);
  const [shown, setShown] = useState(false);

  const handleShown = (e, j) => {
    setShown((i) => ({ ...i, [e]: !i[e] }));
    console.log(shown)
  }

  const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${serverApi}/registered-user`);
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
      <div className='grid grid-cols-3'>
        {tasks.map((e, index) => {
          const formattedDate = new Date(e.JoinedOn).toLocaleDateString('en-US', {
            year: 'numeric',
            day: 'numeric',
            month: 'long',
          })

          return (
            <div className="mx-6 mb-10 max-w-sm" key={e._id}>
              <div className="rounded-lg border bg-white px-4 shadow-lg pb-10">
                <div className='self-end relative ml-auto cursor-pointer w-fit pb-2 px-2 rounded-full mb-2 mt-2' onClick={() => handleShown(index)}>
                  . . .
                  {shown[index] && <article className='absolute min-w-44 bg-white px-2 py-3 rounded-md right-2 z-[5] text-gray-800 font-semibold hover:text-gray-900 hover:border border hover:border-gray-600 transition-all'>
                    <p className='text-sm min-w-fit'>Promote to Sub-Admin</p>
                    {/* <p className='text-sm min-w-fit'>Demote to Member</p> */}
                  </article>}
                </div>

                <div className="relative mx-auto w-36 rounded-full">
                  <img className="mx-auto h-auto w-full rounded-full" src={user} alt="" />
                </div>

                <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-800">{e.name}</h1>
                <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">{e.email}</h3>

                <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
                  <li className="flex items-center py-3 text-sm">
                    <span>Task Completed</span>
                    <span className="ml-auto"><span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">0</span></span>
                  </li>

                  <li className="flex items-center py-3 text-sm">
                    <span>Joined On</span>
                    <span className="ml-auto">{formattedDate}</span>
                  </li>
                </ul>

              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}


// const capatalizefirstLetter = (value) => {
//   return value.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ")
// }
