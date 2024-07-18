import React from 'react'

export default function MaxContent({ children }) {
    return (
        <div className='border border-red-400 max-w-screen-xl m-auto'>
            {children}
        </div>
    );
};