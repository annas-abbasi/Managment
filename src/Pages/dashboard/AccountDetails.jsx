import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../AuthContext';

// export default function AccountDetails() {
//     const [formData, setFormData] = useState({
//         phoneNo: "",
//         Gender: "",
//         Birthday: "",
//         Upwork: "",
//         Slack: "",
//         Linkedin: ""

//     });
//     const [successMessage, setSuccessMessage] = useState('');

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value })
//     }

//     const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;
//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             const response = await axios.post(`${serverApi}/userDetails`, formData)
//             console.log(response)
//             setSuccessMessage('Task created successfully!');
//             setFormData({
//                 phoneNo: "",
//                 Gender: "",
//                 Birthday: "",
//                 Upwork: "",
//                 Slack: "",
//                 Linkedin: ""
//             });
//             setTimeout(() => {
//                 setSuccessMessage('');
//             }, 3000);
//         } catch (error) {
//             console.log('This Error is from the AccountDetails', error)
//         }

//     }


export default function AccountDetails() {
    const [formData, setFormData] = useState({
        phoneNo: "",
        Gender: "",
        Birthday: "",
        Upwork: "",
        Slack: "",
        Linkedin: ""
    });
    const [successMessage, setSuccessMessage] = useState('');
    const { userId } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`${serverApi}/userDetails/${userId.userId}`, formData)
            setSuccessMessage('Details updated successfully!');
            setFormData({
                phoneNo: "",
                Gender: "",
                Birthday: "",
                Upwork: "",
                Slack: "",
                Linkedin: ""
            });
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.log('Error from AccountDetails', error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col space-y-10 mb-10 mt-4'>
                <header className=''>
                    <h2 className='text-gray-800 text-3xl font-semibold'>Account Details</h2>
                </header>
                <section className='grid grid-cols-2 gap-y-16 w-full'>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Change Name:</p>
                        <input type="text"
                            name="name"
                            placeholder='Enter Name here'
                            className='border w-11/12 rounded-md py-2 px-4'
                        />
                    </div>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Change Email:</p>
                        <input type="text"
                            name="email"
                            placeholder='Enter Email here'
                            className='border w-11/12 rounded-md py-2 px-4'
                        />
                    </div>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Old Password:</p>
                        <input type="text"
                            name="name"
                            placeholder='Enter Your Current Password Here'
                            className='border w-11/12 rounded-md py-2 px-4'
                        />
                    </div>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>New Password:</p>
                        <input type="text"
                            name="email"
                            placeholder='Enter Your New Password Here'
                            className='border w-11/12 rounded-md py-2 px-4'
                        />
                    </div>
                </section>

                <section className='self-start pt-4 w-full'>
                    <header className='mt-2'>
                        <h2 className='text-gray-800 text-2xl font-semibold'>Add further details to you Account:</h2>
                    </header>
                    <div className='grid grid-cols-2 gap-y-16 w-full text-gray-800 mt-6'>
                        <div className='space-y-1'>
                            <p className='text-lg font-semibold'>Phone no:</p>
                            <input type="number"
                                name="phoneNo"
                                placeholder='Add your number here.'
                                className='border w-11/12 rounded-md py-2 px-4'
                                value={formData.phoneNo}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='space-y-1'>
                            <p className='text-lg font-semibold'>Gender:</p>
                            <input type="text"
                                name="Gender"
                                placeholder='Add your gender here.'
                                className='border w-11/12 rounded-md py-2 px-4'
                                value={formData.Gender}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='space-y-1'>
                            <p className='text-lg font-semibold'>Birthday:</p>
                            <input type="text"
                                name="Birthday"
                                placeholder='Add your birthday here.'
                                className='border w-11/12 rounded-md py-2 px-4'
                                value={formData.Birthday}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='space-y-1'>
                            <p className='text-lg font-semibold'>Upwork:</p>
                            <input type="text"
                                name="Upwork"
                                placeholder='Add your upwork account here.'
                                className='border w-11/12 rounded-md py-2 px-4'
                                value={formData.Upwork}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='space-y-1'>
                            <p className='text-lg font-semibold'>Slack:</p>
                            <input type="text"
                                name="Slack"
                                placeholder='Add your slack account here.'
                                className='border w-11/12 rounded-md py-2 px-4'
                                value={formData.Slack}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='space-y-1'>
                            <p className='text-lg font-semibold'>Linkedin:</p>
                            <input type="text"
                                name="Linkedin"
                                placeholder='Add your linkedin account here.'
                                className='border w-11/12 rounded-md py-2 px-4'
                                value={formData.Linkedin}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </section>
                <div className='h-3'>
                    {successMessage && (
                        <div className='text-green-600 text-sm mb-4'>
                            {successMessage}
                        </div>
                    )}
                </div>
                <div className='self-start'>
                    <button className='border bg-blue-600 text-white py-2 rounded-md hover:bg-slate-50 hover:text-gray-800 transition-all px-8' type='submit'>Update Profile</button>
                </div>
            </form>
        </>
    )
}


// AccountDetails.jsx
// import axios from 'axios';
// import React, { useState, useContext, useEffect } from 'react';
// import { AuthContext } from './AuthContext';

// export default function AccountDetails() {
//     const [formData, setFormData] = useState({
//         phoneNo: "",
//         Gender: "",
//         Birthday: "",
//         Upwork: "",
//         Slack: "",
//         Linkedin: ""
//     });
//     const [successMessage, setSuccessMessage] = useState('');
//     const { userId } = useContext(AuthContext);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value })
//     }

//     const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             const response = await axios.put(`${serverApi}/userDetails/${userId}`, formData)
//             console.log(response)
//             setSuccessMessage('Details updated successfully!');
//             setFormData({
//                 phoneNo: "",
//                 Gender: "",
//                 Birthday: "",
//                 Upwork: "",
//                 Slack: "",
//                 Linkedin: ""
//             });
//             setTimeout(() => {
//                 setSuccessMessage('');
//             }, 3000);
//         } catch (error) {
//             console.log('Error from AccountDetails', error)
//         }
//     }