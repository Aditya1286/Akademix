import axios from "axios";

const subjectUrl = "backend_url"
export const subjectAttendance = async ({id , subjectCode , mode})=>{
    try {
        const result = await axios.post(subjectUrl , {id,subjectCode , mode},{
            headers: {'Content-Type':'application/json'}
        })
        return {status: "success" , message:"Subject Attendance fetched!" , response: result}
    } catch (error) {
        return {status:"error" , message:{
            err: error,
            res: "error while fetching"
        }}
    }
}

export const aggregateAttendance = async ({id , mode}) => {
    try {
        const result = await axios.post(subjectUrl , {id , mode},{
            headers: {'Content-Type':'application/json'}
        })
        return {status: "success" , message:"Aggregate fetched Succesfully" , response:result}
    } catch (error) {
        return {status: "error" , err:error , message:"Can't fetch Aggregate Attendance"}
    }
}