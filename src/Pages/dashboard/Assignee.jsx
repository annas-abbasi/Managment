import React, { useState } from 'react';
import axios from 'axios';

export default function Assignee() {
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        task: '',
        time: ''
    });

    const [successMessage, setSuccessMessage] = useState('');

    const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${serverApi}/assign-task`, formData);
            console.log('Task created:', response.data);
            setSuccessMessage('Task created successfully!');
            setFormData({
                name: '',
                title: '',
                task: '',
                time: ''
            });
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <>
            <main className='flex flex-col gap-10'>
                <header className='space-y-1 border-gray-300 border-b pb-4'>
                    <h2 className='text-2xl '>Create Task</h2>
                    <p className='text-gray-600 text-sm'>Create a new task here</p>
                </header>
                {successMessage && (
                    <div className='text-green-600 text-sm mb-4'>
                        {successMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-y-16'>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Name:</p>
                        <input
                            type="text"
                            name="name"
                            placeholder='Name of Person to Assign Task'
                            className='border w-11/12 rounded-md py-2 px-4'
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Title:</p>
                        <input
                            type="text"
                            name="title"
                            placeholder='Assign Task Title'
                            className='border w-11/12 rounded-md py-2 px-4'
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Task:</p>
                        <input
                            type="text"
                            name="task"
                            placeholder='Assign Task'
                            className='border w-11/12 rounded-md py-2 px-4'
                            value={formData.task}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Time:</p>
                        <input
                            type="text"
                            name="time"
                            placeholder='Assign the Time Limit'
                            className='border w-11/12 rounded-md py-2 px-4'
                            value={formData.time}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className='py-2 px-4 mt-2 text-white text-base font-semibold bg-blue-600 rounded-md max-w-36 hover:text-blue-600 hover:bg-slate-50 hover:border-blue-600 border transition-all'
                        type="submit"
                    >
                        Send
                    </button>
                </form>
            </main>
        </>
    );
}







// import React, { useState } from 'react';
// import axios from 'axios';

// export default function Assignee() {
//     const [formData, setFormData] = useState({
//         name: '',
//         title: '',
//         task: '',
//         time: ''
//     });

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(`${serverApi}/assign-task`, formData);
//             console.log('Task created:', response.data);
//         } catch (error) {
//             console.error('Error creating task:', error);
//         }
//     };

//     return (
//         <>
//             <main className='flex flex-col gap-10'>
//                 <header className='space-y-1 border-gray-300 border-b pb-4'>
//                     <h2 className='text-2xl '>Create Task</h2>
//                     <p className='text-gray-600 text-sm'>Create a new task here</p>
//                 </header>
//                 <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-y-16'>
//                     <div className='space-y-1'>
//                         <p className='text-lg font-semibold'>Name:</p>
//                         <input
//                             type="text"
//                             name="name"
//                             placeholder='Name of Person to Assign Task'
//                             className='border w-11/12 rounded-md py-2 px-4'
//                             value={formData.name}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div className='space-y-1'>
//                         <p className='text-lg font-semibold'>Title:</p>
//                         <input
//                             type="text"
//                             name="title"
//                             placeholder='Assign Task Title'
//                             className='border w-11/12 rounded-md py-2 px-4'
//                             value={formData.title}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div className='space-y-1'>
//                         <p className='text-lg font-semibold'>Task:</p>
//                         <input
//                             type="text"
//                             name="task"
//                             placeholder='Assign Task'
//                             className='border w-11/12 rounded-md py-2 px-4'
//                             value={formData.task}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div className='space-y-1'>
//                         <p className='text-lg font-semibold'>Time:</p>
//                         <input
//                             type="text"
//                             name="time"
//                             placeholder='Assign the Time Limit'
//                             className='border w-11/12 rounded-md py-2 px-4'
//                             value={formData.time}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <button
//                         className='py-2 px-4 mt-2 text-white text-base font-semibold bg-blue-600 rounded-md max-w-36 hover:text-blue-600 hover:bg-slate-50 hover:border-blue-600 border transition-all'
//                         type="submit"
//                     >
//                         Send
//                     </button>
//                 </form>
//             </main>
//         </>
//     );
// }
