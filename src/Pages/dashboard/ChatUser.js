import React, { useEffect, useState } from 'react';

export default function ChatUser({ userSelect }) {
    const [users, setUsers] = useState([]);

    const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${serverApi}/registered-user`);
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [serverApi]);

    return (
        <main className='relative overflow-hidden'>
            <header className='px-2 border-b pb-1'>
                <h2 className='font-semibold text-2xl text-gray-800'>All Users</h2>
                <p className='text-sm text-gray-800'>Select user for chat</p>
            </header>

            <section className='px-2 py-2 space-y-4 h-screen overflow-y-scroll custom-scrollbar'>
                {users.map((user) => (
                    <div
                        key={user.id} // Ensure the user has a unique ID
                        className='flex items-start gap-2 border-b pb-3 cursor-pointer my-1 hover:opacity-70'
                        onClick={() => userSelect(user)} // Pass entire user object for selection
                    >
                        <figure>
                            <img src={user.image || 'defaultImagePath'} alt="user" className='w-10 h-10 rounded-full' />
                        </figure>
                        <div>
                            <h5 className='text-base text-gray-700 font-semibold leading-5'>{user.name}</h5>
                            <p className='text-sm text-gray-600 tracking-tighter'>{user.message}</p>
                        </div>
                    </div>
                ))}
            </section>

            <div className="h-10 absolute bottom-0 w-full bg-gray-200 blur-2xl"></div>
        </main>
    );
}







// import React, { useEffect, useState } from 'react';

// export default function ChatUser({ userSelect }) {
//     const [users, setUsers] = useState([]);


//     const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await fetch(`${serverApi}/registered-user`);
//                 const data = await response.json();
//                 setUsers(data);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };

//         fetchUsers();
//     }, [serverApi]);

//     return (
//         <main className='relative overflow-hidden'>
//             <header className='px-2 border-b pb-1'>
//                 <h2 className='font-semibold text-2xl text-gray-800'>All Users</h2>
//                 <p className='text-sm text-gray-800'>Select user for chat</p>
//             </header>

//             <section className='px-2 py-2 space-y-4 h-screen overflow-y-scroll custom-scrollbar'>
//                 {users.map((user, index) => (
//                     <div
//                         key={index}
//                         className='flex items-start gap-2 border-b pb-3 cursor-pointer my-1 hover:opacity-70'
//                         onClick={() => userSelect(user)}
//                     >
//                         <figure>
//                             <img src={user.image || 'defaultImagePath'} alt="user" className='w-10 h-10 rounded-full' />
//                         </figure>
//                         <div>
//                             <h5 className='text-base text-gray-700 font-semibold leading-5'>{user.name}</h5>
//                             <p className='text-sm text-gray-600 tracking-tighter'>{user.message}</p>
//                         </div>
//                     </div>
//                 ))}
//             </section>

//             <div className="h-10 absolute bottom-0 w-full bg-gray-200 blur-2xl"></div>
//         </main>
//     );
// }