import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;

export default function ViewProfile({ navigate }) {
    const [getData, setGetData] = useState({});

    useEffect(() => {
        const handleGetData = async () => {
            try {
                const response = await axios.get(`${serverApi}/userDetails`)
                setGetData(response.data)
                console.log(response.data)
            } catch (error) {
                console.log('error from the frontend ViewProfile', error)
            }
        }
        handleGetData();
    }, [])

    return (
        <div>
            <div className='mb-10'>
                <Link to={navigate} className='text-3xl text-zinc-800 underline cursor-pointer hover:text-zinc-600 transition-all'>Go Back</Link>
            </div>
            <div>
                <h1 className='text-gray-800 text-3xl font-semibold'>Name Title</h1>
                <p className=''>example@gmail.com</p>
            </div>

            <section className='w-full'>
                {getData.map((data, index) => {
                    return (
                        <div className='w-full grid grid-cols-2 gap-12 mt-8'>
                            <div>
                                <h2 className='font-semibold text-gray-700 text-xl'>Phone No.</h2>
                                <p className='text-gray-600'>{data.phoneNo}</p>
                            </div>
                            <div>
                                <h2 className='font-semibold text-gray-700 text-xl'>Gender</h2>
                                <p className='text-gray-600'>{data.Gender}</p>
                            </div>
                            <div>
                                <h2 className='font-semibold text-gray-700 text-xl'>Date of Birth</h2>
                                <p className='text-gray-600'>{data.Birthday}</p>
                            </div>
                            <div>
                                <h2 className='font-semibold text-gray-700 text-xl'>Upwork</h2>
                                <p className='text-gray-600'>{data.Upwork}</p>
                            </div>
                            <div>
                                <h2 className='font-semibold text-gray-700 text-xl'>Slack</h2>
                                <p className='text-gray-600'>{data.Slack}</p>
                            </div>
                            <div>
                                <h2 className='font-semibold text-gray-700 text-xl'>Linkedin</h2>
                                <p className='text-gray-600'>{data.Linkedin}</p>
                            </div>
                            <div>
                                <h2 className='font-semibold text-gray-700 text-xl'>Task Approved</h2>
                                <p className='text-gray-600'>08</p>
                            </div>
                            <div>
                                <h2 className='font-semibold text-gray-700 text-xl'>Task Not-Approved</h2>
                                <p className='text-gray-600'>2</p>
                            </div>
                        </div>
                    )
                })}
            </section>
        </div>
    )
}
