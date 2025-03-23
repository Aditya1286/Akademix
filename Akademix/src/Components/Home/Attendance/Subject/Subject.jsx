import React from 'react'
import { useState } from 'react';
import { Gauge , gaugeClasses } from '@mui/x-charts';
import { useEffect } from 'react';
import {subjectAttendance} from '../../../api/apiSubject'


function Subject({ subjectCode, id }) {

    const [subjectAttendance, setSubjectAttendance] = useState(85) //Use the api to fetch data from backend


    const result = () => {
        //subjectAttendance api logic to fetch subjectAttendance from backend
    }
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
            <div className='w-full h-full  bg-white flex  shadow-white shadow-[0_0_30px_20px] justify-between
                items-center
            text-black'>
                <div className='w-[50%] h-full text-xl flex flex-col justify-center items-center '>
                    <p className='text-3xl font-bold'>{subjectCode} CSE320</p>
                    <p>Subject Description</p>
                </div>
                <div className='w-[50%] flex justify-center items-center h-full '>
                    <Gauge
                        {...settings}
                        value={subjectAttendance}
                        sx = {(theme)=>({
                            width:120,
                            height:120,
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