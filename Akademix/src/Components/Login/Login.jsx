
import React, { useEffect, useState } from 'react'
import { loginUser, registerUser } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'
function Login() {
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState(false)
  const [passVisible, setPassVisible] = useState(false)
  const [otp, setOtp] = useState("")
  const [verifyOtp, setVerifyOtp] = useState("")
  const navigate = useNavigate();
  const handler = () => {
    setVisible(!visible)
  }

  const generateOtp = () => {
    return Math.floor(10000 + Math.random() * 900000).toString()
  }

  const sendEmail = async (email) => {
    const otp = generateOtp();
    setVerifyOtp(otp);

    const templateParams = {
      email: email,
      passcode: otp,
    }
    try {
      const result = await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_API
      )
      console.log("Otp sent successfully ", result.text)
    }
    catch (error) {
      console.log("Failed to send OTP", error)
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      option: visible,
      firstName: fname,
      lastName: lname,
      email: email,
      password: password,
    };
    const response = await handleSubmit(formData);
    // alert(response.message || "Something went wrong"); // Show success/error messages
    if (response.status === 'success' && otp == verifyOtp) {
      navigate('/home')
    }
    else {
      passVisible ? "" : setPassVisible(true)
    }
  }

  const handleSubmit = async (formData) => {
    try {
      const response = await formData.option ? registerUser(formData) : loginUser(formData)
      console.log("handle submit response ", response.message)
      return response
    } catch (error) {
      console.error("Form Submit Error:", error);
      return error.response?.data || { message: "an error occured" };
    }
  }


  return (
    <div className="bg-gradient-to-r from-gray-200 to-blue-100 min-h-screen flex items-center justify-center p-4 font-sans">
      {/* Signup Form */}
      <div className={`max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden ${visible ? "" : "hidden"}`}>
        <div className="bg-blue-600 py-4">
          <h1 className="text-2xl font-bold text-center text-white">Create Account</h1>
        </div>
        <div className="p-6 outline-none border-none">
          <form method="post" onSubmit={onSubmit} className="space-y-6">
            <input type="text" placeholder="First Name" required value={fname} onChange={(e) => setFname(e.target.value)} className="w-full border-b-2 px-1 pt-2 text-xl border-gray-300 pb-2 focus:border-blue-600" />
            <input type="text" placeholder="Last Name" required value={lname} onChange={(e) => setLname(e.target.value)} className="w-full border-b-2 px-1 pt-2 text-xl border-gray-300 pb-2 focus:border-blue-600" />
            <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-b-2 px-1 pt-2 text-xl border-gray-300 pb-2 focus:border-blue-600" />
            <button type='button' className={`text-blue-800 font-bold ml-2`} onClick={() => sendEmail(email)} > Send Otp </button>
            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border-b-2 px-1 pt-2 text-xl border-gray-300 pb-2 focus:border-blue-600" />
            <input type="text" placeholder="OTP" required onChange={(e) => setOtp(e.target.value)} className="w-full pt-2 px-1 text-xl border-b-2 border-gray-300 pb-2 focus:border-blue-600" />
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium">Sign Up</button>
          </form>
          <p className="text-center mt-4">Already have an account? <button className="text-blue-600" onClick={handler}>Sign In</button></p>
        </div>
      </div>

      {/* Sign In Form */}
      <div className={`max-w-md w-full flex flex-col bg-white rounded-xl shadow-lg overflow-hidden ${visible ? "hidden" : ""}`}>
        <div className="bg-blue-600 py-4">
          <h1 className="text-2xl font-bold text-center text-white">Sign In</h1>
        </div>
        <div className={`w-full text-center text-red-500 border-red-2 ${passVisible ? "" : "hidden"}`}><p>Password, email or Otp is incorrect.</p></div>
        <div className="p-6 border-none outline-none">
          <form method="post" onSubmit={onSubmit} className="space-y-6">
            <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-b-2 px-1 pt-2 text-xl border-gray-300 pb-2 focus:border-blue-600 " />
            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pt-2 px-1 text-xl border-b-2 border-gray-300 pb-2 focus:border-blue-600" />
            <input type="text" placeholder="OTP" required onChange={(e) => setOtp(e.target.value)} className="w-full pt-2 px-1 text-xl border-b-2 border-gray-300 pb-2 focus:border-blue-600" />
            <button type='button' className={`text-blue-800 font-bold ml-2`} onClick={() => sendEmail(email)} > Send Otp </button>

            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium">Sign In</button>
          </form>
          <p className="text-center mt-4">Don't have an account? <button className="text-blue-600" onClick={handler}>Sign Up</button></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
