import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
function ChartAnalysis({ attendanceData }) {


   
    const tempData = [
        {
            code: "302", 
            description: "Computer Science ",
            Attendance: "81",
        },
        {
            code: "321",
            description: "Electronics",
            Attendance: "72",
        },
        {
            code: "345",
            description: "Robotics",
            Attendance: "47"
        },
        {
            code: "300",
            description: "Mathematics",
            Attendance: "89"
        },
        {
            code: "322",
            description: "DSA",
            Attendance: "92"
        }
    ]
    const xLabels = tempData.map((item) => item.code);
    const attendanceValues = tempData.map((item) => item.Attendance);

    return (
        <div className='w-full h-full'>
            <div className='w-full h-full flex font-bold  justify-center items-center flex-grow'>
                <BarChart
                    xAxis={[{ scaleType: 'band', data: xLabels, label:   "Subjects" }]}
                    series={[{ data: attendanceValues, label: "Attendance (%)" }]}
                    width={600}
                    height={380}
                />
            </div>
        </div>
    )
}

export default ChartAnalysis