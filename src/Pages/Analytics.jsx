import React from 'react'
import Graph1 from '../Images/graph1.png'
import Graph2 from '../Images/graph2.png'

export default function Analytics() {
    return (
        <>
            <div className="mx-auto flex max-w-lg flex-col px-4 py-20 lg:max-w-screen-xl lg:flex-row">
                <div className="mb-10 max-w-lg lg:mb-0 lg:pr-16 xl:pr-20">
                    <div className="mb-5 text-4xl font-bold text-blue-600">Analytics App With a an Edge. Innovation.</div>
                    <div className="mb-5 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus modi, magni repellat doloremque autem tempore facere adipisci nam ratione vitae quibusdam earum optio laudantium ipsum aliquid harum nulla.</div>
                    <div className="">
                        <p className="font-bold text-blue-600">JAMES EDWARD</p>
                        <p className="text-gray-500">CEO, Analytica</p>
                    </div>
                </div>
                <div className="mr-10 mb-6 lg:mb-0">
                    <img alt='Graph One' src={Graph1} className="shadow-blue-600/10 w-full max-w-sm object-contain object-left shadow-lg" />
                    <div className="p-4">
                        <p className="mb-1 font-medium uppercase text-blue-600">Who we are</p>
                        <h5 className="text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae, temporibus!</h5>
                        <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="">
                    <img alt='Graph Two' src={Graph2} className="shadow-blue-600/10 w-full max-w-sm object-contain object-left shadow-lg" />
                    <div className="p-4">
                        <p className="mb-1 font-medium uppercase text-blue-600">Our Practices</p>
                        <h5 className="text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae, temporibus!</h5>
                        <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
