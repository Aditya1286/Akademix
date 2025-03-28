import React from 'react'
import { useState } from 'react';
import { Gauge , gaugeClasses } from '@mui/x-charts';
import { useEffect } from 'react';

function Subject({subjectCode , SubjectDescription , attendance , bgColor}) {

    const [subjectAttendance, setSubjectAttendance] = useState(attendance) 

    useEffect(()=>{
            //Data update Logic on first render 
    }, [])
    const settings = {
        width:100,
        height:100,
        startAngle:0,
        endAngle:360,
        innerRadius:"80%",
        outerRadius:"100%",
    }
    return (
        <>
            <div className={`w-full overflow-hidden h-full ${bgColor?"bg-white":"bg-gray-200"}  flex justify-between
                items-center
            text-black`}>
                <div className='w-[50%] h-full 4185text-lg flex flex-col justify-center items-center '>
                    <p className='text-lg font-bold'>{subjectCode}</p>
                    <p>{SubjectDescription}</p>
                </div>
                <div className='w-[50%] flex justify-center content-end items-center h-full '>
                    <Gauge
                        {...settings}
                        value={subjectAttendance}
                        sx = {(theme)=>({
                            width:100,
                            height:100,
                            [`& .${gaugeClasses.valueArc}`]:{
                                fill: subjectAttendance>80?"green":subjectAttendance>50?"orange":"red"
                            },
                        })}
                    >
                    </Gauge>
                </div>
            </div>
        </> 
    )
}

export default Subject