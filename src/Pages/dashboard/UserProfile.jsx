import axios from 'axios';
import React, { useEffect, useState } from 'react'
import user from '../../Images/user.png'

export default function UserProfile() {
  const [tasks, setTasks] = useState([]);

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

  const capatalizefirstLetter = (value) => {
    return value.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ")
  }

  return (
    <>
      <div className='grid grid-cols-3'>
        {tasks.map((e) => {
          return (
            <div className="mx-6 mb-10 max-w-sm" key={e._id}>
              <div className="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">

                <div className="relative mx-auto w-36 rounded-full">
                  <img className="mx-auto h-auto w-full rounded-full" src={user} alt="" />
                </div>

                <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-800">{capatalizefirstLetter(e.name)}</h1>
                <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">{e.email}</h3>

                <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
                  <li className="flex items-center py-3 text-sm">
                    <span>Task Completed</span>
                    <span className="ml-auto"><span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">0</span></span>
                  </li>

                  <li className="flex items-center py-3 text-sm">
                    <span>Joined On</span>
                    <span className="ml-auto">Joined</span>
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