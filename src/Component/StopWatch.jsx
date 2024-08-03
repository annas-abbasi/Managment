import React, { useState, useEffect } from 'react';

// Helper function to format time
const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return {
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
    };
};

const Stopwatch = () => {
    const [time, setTime] = useState(0); // Time in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(Date.now()); // Time of last update

    // Load time and state from local storage on component mount
    useEffect(() => {
        const savedTime = parseInt(localStorage.getItem('stopwatchTime'), 10);
        const savedIsRunning = localStorage.getItem('stopwatchIsRunning') === 'true';
        const savedIsEnded = localStorage.getItem('stopwatchIsEnded') === 'true';
        const savedLastUpdate = parseInt(localStorage.getItem('stopwatchLastUpdate'), 10);

        if (savedTime) setTime(savedTime);
        if (savedIsRunning) {
            setIsRunning(true);
            setLastUpdate(savedLastUpdate || Date.now()); // Restore last update time
        }
        if (savedIsEnded) setIsEnded(true);
    }, []);

    // Save time and state to local storage when time or state changes
    useEffect(() => {
        localStorage.setItem('stopwatchTime', time);
        localStorage.setItem('stopwatchIsRunning', isRunning);
        localStorage.setItem('stopwatchIsEnded', isEnded);
        localStorage.setItem('stopwatchLastUpdate', lastUpdate);
    }, [time, isRunning, isEnded, lastUpdate]);

    // Start or resume the timer
    const startTimer = () => {
        if (isEnded) return; // Do nothing if timer is ended

        if (!isRunning) {
            setIsRunning(true);
            setLastUpdate(Date.now()); // Update last update time
            const id = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
                setLastUpdate(Date.now()); // Update last update time
            }, 1000);
            setIntervalId(id);
        }
    };

    // Pause the timer
    const pauseTimer = () => {
        if (isRunning) {
            clearInterval(intervalId);
            setIsRunning(false);
        }
    };

    // End the timer
    const endTimer = () => {
        if (isRunning) {
            clearInterval(intervalId);
            setIsRunning(false);
            setIsEnded(true);
        }
    };

    // Reset the timer and stop it completely
    const resetTimer = () => {
        clearInterval(intervalId);
        setTime(0);
        setIsRunning(false);
        setIsEnded(false);
        localStorage.removeItem('stopwatchTime');
        localStorage.removeItem('stopwatchIsRunning');
        localStorage.removeItem('stopwatchIsEnded');
        localStorage.removeItem('stopwatchLastUpdate');
    };

    useEffect(() => {
        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [intervalId]);

    const { hours, minutes, seconds } = formatTime(time);

    return (
        <div>
            <h1>
                {hours}:{minutes}:{seconds}
            </h1>
            <button onClick={startTimer} disabled={isEnded}>Start</button>
            <button onClick={pauseTimer} disabled={!isRunning || isEnded}>Pause</button>
            <button onClick={endTimer} disabled={isEnded}>End</button>
            {isEnded && <button onClick={resetTimer}>Reset</button>}
        </div>
    );
};

export default Stopwatch;






// import React, { useState } from 'react'

// export default function StopWatch() {
//     const [time, setTime] = useState({ hr: 0, min: 0, sec: 0, mili: 0 })
//     const [status, setStatus] = useState();

//     let updHr = time.hr
//     let updMin = time.min
//     let updSec = time.sec
//     let updMili = time.mili
//     const start = () => {
//         myFunc();
//         setStatus(setInterval(myFunc, 10))
//     }

//     const stop = () => {
//         clearInterval(status);
//     }
//     const reset = () => {
//         clearInterval(status);
//         setTime({ hr: 0, min: 0, sec: 0, mili: 0 })
//     }

//     const myFunc = () => {
//         if (updMili === 100) {
//             updMili = 0;
//             updSec++
//         }
//         if (updSec === 60) {
//             updSec = 0;
//             updMin++;
//         }
//         if (updMin === 60) {
//             updMin = 0;
//             updHr++;
//         }
//         updMili++;
//         setTime({ hr: updHr, min: updMin, sec: updSec, mili: updMili })
//     }

//     return (
//         <div className='flex items-center flex-col py-16 px-16 gap-6'>
//             <h1>{time.hr + ":" + time.min + ":" + time.sec + ":" + time.mili}</h1>
//             <div space-x-4>
//                 <button className='start py-2 px-4 bg-blue-600' onClick={start}>Start</button>
//                 <button className='stop py-2 px-4 bg-red-600' onClick={stop}>Stop</button>
//                 <button className='reset py-2 px-4 bg-yellow-600' onClick={reset}>Reset</button>
//             </div>
//         </div>
//     )
// }
