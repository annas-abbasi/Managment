import React from 'react'
import Graph3 from '../Images/graph3.png'
import Graph4 from '../Images/graph4.png'

export default function Detailed() {
    return (
        <>
            <div className="bg-gray-100">
                <div className="mx-auto flex max-w-lg flex-col px-4 py-10 lg:max-w-screen-xl lg:flex-row">

                    <div className="max-w-lg pt-10 pr-10">
                        <h2 className="mb-7 text-3xl font-medium text-gray-700 sm:text-4xl">Detailed Analytics</h2>
                        <p className="mb-10 text-lg leading-relaxed text-gray-600 sm:leading-loose">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, eveniet deserunt? Enim praesentium dolor hic laudantium?</p>
                        <p className="mb-6 text-lg leading-relaxed text-gray-600 sm:leading-loose">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate repellat laboriosam fugiat illum excepturi dolore dolores inventore unde officiis amet, asperiores id, sed beatae quibusdam sint dolor voluptatum ex dolorum!</p>
                        <a href="/" className="border-b-4 border-blue-600 pb-2 text-lg font-bold text-blue-600">Contact Sales</a>
                    </div>

                    <div className="-order-1 lg:order-1">
                        <div className="mb-8">
                            <img className="shadow-blue-500/10 mb-7 h-full w-full rounded-xl object-contain shadow-lg" src={Graph3} alt="" />
                        </div>
                        <div className="">
                            <img className="shadow-blue-500/10 h-full w-full rounded-xl object-contain shadow-lg" src={Graph4} alt="" />
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}
