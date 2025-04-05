import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
function Fee() {
    const navigate = useNavigate();
    const navigationHandler = () => {
        navigate('/fee')
    }
    return (
        <>
            <div className='w-full h-full rounded-md bg-white'>
                <div className='w-full h-[85%]  flex rounded-md flex-col justify-center gap-0 flex-1  items-center'>
                    <div className='text-xl font-bold '>
                        <p>NIL</p>
                    </div>
                    <div className='text-md'>
                        <i class="fa-solid fa-money-bill-1"></i>
                        <button onClick={navigationHandler} className='text-md'>Fee Notification</button>
                    </div>

                </div>
                <div className='footer mt-auto w-full bg-gray-300 flex h-[15%]  px-3 justify-center items-center'>
                    <button className='ml-auto w-[30%] h-[50%] text-sm rounded-full bg-blue-400'>Transaction</button>
                </div>
            </div>

        </>

    )
}

export default Fee