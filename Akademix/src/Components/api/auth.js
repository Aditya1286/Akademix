import axios from 'axios'

const appUrl = 'http://localhost:82/Php/register.php'

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(appUrl,userData,{
            headers: {'Content-Type':'application/json'}
        })
        console.log("Login response " , response.data)
        return response.data
    } catch (error) {
        console.log("Login error :: ",error)
        return error.response.data || { message: "Login request failed" };
    }   
}

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(appUrl,userData,{
            headers: {'Content-Type':'application/json'}
        })
        console.log("Register response " , response.data)
        return response.data
    } catch (error) {
        console.log(" registration error :: ",error)
        return error.response.data || { message: "Register request failed" };
    }
}