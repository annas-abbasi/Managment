import React, { useState } from 'react'

export default function StopWatch() {
    const [time, setTime] = useState({ hr: 0, min: 0, sec: 0, mili: 0 })
    const [status, setStatus] = useState();

    let updHr = time.hr
    let updMin = time.min
    let updSec = time.sec
    let updMili = time.mili
    const start = () => {
        myFunc();
        setStatus(setInterval(myFunc, 10))
    }

    const stop = () => {
        clearInterval(status);
    }
    const reset = () => {
        clearInterval(status);
        setTime({ hr: 0, min: 0, sec: 0, mili: 0 })
    }

    const myFunc = () => {
        if (updMili === 100) {
            updMili = 0;
            updSec++
        }
        if (updSec === 60) {
            updSec = 0;
            updMin++;
        }
        if (updMin === 60) {
            updMin = 0;
            updHr++;
        }
        updMili++;
        setTime({ hr: updHr, min: updMin, sec: updSec, mili: updMili })
    }

    return (
        <div className='flex items-center flex-col py-16 px-16 gap-6'>
            <h1>{time.hr + ":" + time.min + ":" + time.sec + ":" + time.mili}</h1>
            <div space-x-4>
                <button className='start py-2 px-4 bg-blue-600' onClick={start}>Start</button>
                <button className='stop py-2 px-4 bg-red-600' onClick={stop}>Stop</button>
                <button className='reset py-2 px-4 bg-yellow-600' onClick={reset}>Reset</button>
            </div>
        </div>
    )
}
