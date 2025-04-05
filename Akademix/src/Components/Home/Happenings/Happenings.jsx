import React from 'react'
import akademixAchievements from './HappeningsData'
import { nanoid } from '@reduxjs/toolkit'
function Happenings({ Heading = "Happenings" }){
    const data = akademixAchievements
    return (
    <>
            <div className='w-full h-full bg-white overflow-hidden '>
                <div className='w-full h-[85%] flex flex-col gap-3 mt-3 overflow-hidden no-scrollbar overflow-y-auto text-xs pl-5  font-bold'>
                {data.map((data)=>(
                    <div key={nanoid()} className='w-full  h-[15%] flex gap-2 items-center justify- center'>
                        <span className='w-[1%] h-full bg-blue-500'></span>
                        <span className='w-[98%] h-full flex  flex-wrap items-center'><span><p>{data.achievements}</p></span></span>
                    </div>
                ))}
            </div>
            
        </div>
    </>
    )
}

export default Happenings