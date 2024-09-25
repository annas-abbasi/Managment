import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../AuthContext';

export default function Login() {
    const [shown, setShown] = useState(false);
    const handleShown = () => {
        setShown(!shown);
    };

    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [role, setRole] = useState('user');

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const serverApi = process.env.REACT_APP_BACKEND_SERVER_PATH;
    // console.log(serverApi)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${serverApi}/login`, { ...loginData, role }, { withCredentials: true });
            if (res.data.error) {
                throw new Error(`Server error! ${res.data.error}`);
            }
            const token = res.data.token;
            localStorage.setItem('Token', token);
            // if (role === "admin") {
            //     console.log("Admin has logged In.")
            // } else {
            //     console.log("User has logged In.")
            // }
            const { user } = res.data;
            setUser(user);
            setRedirect(true);
            console.log("This is the Response:", res)
        } catch (error) {
            console.log(error)
            const errorMessage = error.response?.data?.error;
            setError(errorMessage);
            setTimeout(() => {
                if (errorMessage) {
                    setError('')
                }
            }, 2000);
        }
    };

    if (redirect) {
        return <Navigate to="/dashboard" />;
    }
    return (
        <>
            <div className="flex py-36 min-h-screen w-full items-center justify-center text-gray-600 bg-gray-50">
                <div className="relative">

                    <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
                        <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.6) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none' /><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' strokeWidth='1' stroke='none' fill='currentColor' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)' /></svg>
                    </div>

                    <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
                        <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='b' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.5) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none' /><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' strokeWidth='1' stroke='none' fill='currentColor' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#b)' /></svg>
                    </div>

                    <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
                        <div className="flex-auto p-6">

                            <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                                <p className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500">
                                    <span className="flex-shrink-0 text-3xl font-black lowercase tracking-tight opacity-100">LOGOHERE.</span>
                                </p>
                            </div>

                            <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Welcome to NameHERE!</h4>
                            <p className="mb-6 text-gray-500">Please sign-in to access your account</p>

                            {error ? <div className='text-red-600'>{error}</div> : <div> &nbsp;</div>}
                            <form id="" className="mb-4" action="#" method="POST" onSubmit={handleSubmit}>

                                <div className="mb-4">
                                    <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Email</label>
                                    <input type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" id="email" name="email" value={loginData.email} placeholder="Enter your email or username" onChange={handleChange} />
                                </div>

                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700" htmlFor="password">Password</label>
                                        <p className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500">
                                            <small className=" " onClick={handleShown}>Show Password</small>
                                        </p>
                                    </div>

                                    <div className="relative flex w-full flex-wrap items-stretch">
                                        <input type={shown ? "text" : "password"} id="password" className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" value={loginData.password} name="password" placeholder="············" onChange={handleChange} />
                                    </div>
                                </div>

                                {/* <p className='mb-1 font-semibold'>Login As?</p> */}
                                {/* <div className='flex items-center flex-wrap gap-4 justify-between flex-grow mb-4'>
                                    <button className='rounded-md border bg-zinc-300 text-zinc-700 px-4 py-1 flex-grow border-gray-600 hover:bg-gray-500 hover:text-white transition-all focus:bg-gray-500 focus:text-white'>Admin</button>
                                    <button className='rounded-md border bg-zinc-300 text-zinc-700 px-4 flex-grow py-1 border-gray-600 hover:bg-gray-500 hover:text-white focus:bg-gray-500 focus:text-white transition-all'>Sub Admin</button>
                                    <button className='rounded-md border bg-zinc-300 text-zinc-700 hover:bg-gray-500 hover:text-white transition-all px-4 py-1 flex-grow border-gray-600 focus:bg-gray-500 focus:text-white'>User</button>
                                </div> */}

                                {/* <div className='flex items-center gap-4 my-2'>
                                    <label htmlFor="user" className='cursor-pointer'>
                                        <input type="radio" id='user' value="user" checked={role === "user"} onChange={(e) => setRole(e.target.value)} className='mr-1' />
                                        login as user
                                    </label>
                                    <label htmlFor="admin" className='cursor-pointer'>
                                        <input type="radio" id='admin' value="admin" checked={role === "admin"} onChange={(e) => setRole(e.target.value)} className='mr-1' />
                                        login as admin
                                    </label>
                                </div> */}

                                <div className='space-x-4'>
                                    <label>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="user"
                                            checked={role === 'user'}
                                            onChange={() => setRole('user')} />User</label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="admin"
                                            onChange={() => setRole('admin')} />Admin</label>
                                </div>

                                <div className="mb-4">
                                    <button className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none" type="submit">Sign in</button>
                                </div>
                            </form>

                            <p className="mb-4 text-center">Don't have an account?
                                <Link to={"/Signup"} className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500">&nbsp; Signup Here</Link>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}




// 


//     return (
//         <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col space-y-10 mb-10 mt-4'>
//             {/* Your form fields and other components */}
//         </form>
//     )
// }
