import React, { useContext, useState } from 'react'
import Img1 from '../../Images/user.png'
import { AuthContext } from '../../AuthContext';

export default function EditProfile() {


    const { user } = useContext(AuthContext);
    const [selectImage, setSelectImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    // const { user } = useContext(AuthContext);
    // const [selectImage, setSelectImage] = useState(null);
    // const valuee = (value) => {
    //     return value.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ")
    // }

    // const handleImage = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         setSelectImage(URL.createObjectURL(file))
    //     }
    // }


    const valuee = (value) => {
        return value.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ");
    };

    const handleImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectImage(URL.createObjectURL(file));
            setSelectedFile(file); // Save the file to be uploaded later
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('/api/update-profile-image', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (response.ok) {
                alert('Profile image updated successfully!');
            } else {
                alert('Failed to update profile image.');
            }
        } catch (error) {
            console.error('Error updating profile image:', error);
        }
    };

    return (
        <div className='flex items-center justify-center flex-col space-y-10 mb-10 mt-4'>
            <header className=''>
                <h2 className='text-gray-800 text-3xl font-semibold'>Edit Profile</h2>
            </header>
            <div className='self-start relative'>

                {/* <img src={selectImage || Img1} alt="user" className='w-48 h-48 rounded-full object-cover' /> */}
                <img src={selectImage || Img1} alt="user" className='w-48 h-48 rounded-full object-cover' />

                <div className='absolute bottom-10 right-0 bg-zinc-50 border py-[2px] px-4 text-gray-600 rounded-md cursor-pointer hover:border-gray-600 hover:text-black transition-all' onClick={() => document.getElementById('fileInput').click()}>
                    edit
                </div>
                <input
                    id='fileInput'
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={handleImage}
                />
                <p className='text-xl text-gray-700 font-semibold mt-2 text-center'>{valuee(user)}</p>
            </div>
            <section className='grid grid-cols-2 gap-y-16 w-full pt-10'>

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
                            name="phone"
                            placeholder='Add your number here.'
                            className='border w-11/12 rounded-md py-2 px-4'
                        />
                    </div>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Gender:</p>
                        <input type="text"
                            name="gender"
                            placeholder='Add your gender here.'
                            className='border w-11/12 rounded-md py-2 px-4'
                        />
                    </div>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Birthday:</p>
                        <input type="text"
                            name="birthday"
                            placeholder='Add your birthday here.'
                            className='border w-11/12 rounded-md py-2 px-4'
                        />
                    </div>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Upwork:</p>
                        <input type="text"
                            name="upwork"
                            placeholder='Add your upwork account here.'
                            className='border w-11/12 rounded-md py-2 px-4'
                        />
                    </div>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Slack:</p>
                        <input type="text"
                            name="slack"
                            placeholder='Add your slack account here.'
                            className='border w-11/12 rounded-md py-2 px-4'
                        />
                    </div>
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold'>Linkedin:</p>
                        <input type="text"
                            name="linkedin"
                            placeholder='Add your linkedin account here.'
                            className='border w-11/12 rounded-md py-2 px-4'
                        />
                    </div>
                </div>
            </section>
            <div className='self-start'>
                <button onClick={handleSubmit} className='border bg-blue-600 text-white py-2 rounded-md hover:bg-slate-50 hover:text-gray-800 transition-all px-8'>Update Profile</button>
            </div>
        </div>
    )
}
