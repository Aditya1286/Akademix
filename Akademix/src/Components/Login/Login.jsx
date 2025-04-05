import React, { useEffect, useState } from 'react'
import { loginUser, registerUser } from '../../api/auth'
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
  const [transfer, setTransfer] = useState(false)
  const navigate = useNavigate();
  
  const handler = () => {
    setVisible(!visible)
    setTransfer(!transfer)
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
    <>
      <div className="bg-[#121212] w-full h-screen">
        <div className={`w-full h-screen  flex overflow-hidden
     flex-grow justify-around px-[10%] `}>
          <div className={`flex w-full h-full`}>
            <div className={`w-[50%] h-full relative transition-transform duration-400 bg-[#121212] ${transfer?"translate-x-full":""} ease-out`}>
            <div className="w-full z-0 absolute h-[10vh] bg-[#121212] inset-y-[90%]"></div>
              <div className="w-full h-full z-10"><iframe src='https://my.spline.design/particleaibrain-ce2524b724a4d33e44337487d0ab0519/' frameborder='0' width='100%' height='100%'></iframe></div>
             
            </div>
            <div className={`bg-[#121212]  transition-transform durationn-400 ease-int
            ${transfer?"-translate-x-full":""} 
      w-[50%] from-black  to-gray-800 min-h-screen flex items-center justify-center p-4 font-sans`}>
              {/* Signup Form */}
              <div className={` w-[60%] bg-black shadow-white shadow-[0_0_100px_0] rounded-xl h-[60%] overflow-hidden ${visible ? "" : "hidden"}`}>
                <div className="bg-bl-600 bg-gray-200  py-4">
                  <h1 className="text-2xl font-bold bg-gray-200 text-center text-black">Create Account</h1>
                </div>
                <div className="p-6 outline-none border-none">
                  <form method="post" onSubmit={onSubmit} className="space-y-6">
                    <input type="text" placeholder="First Name" required value={fname} onChange={(e) => setFname(e.target.value)} className="w-full border-b-2 px-1 pt-2 text-xl placeholder-white bg-black text-white" />
                    <input type="text" placeholder="Last Name" required value={lname} onChange={(e) => setLname(e.target.value)} className="w-full border-b-2 px-1 pt-2 text-xl placeholder-white bg-black text-white" />
                    <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-b-2 px-1 pt-2 text-xl placeholder-white bg-black text-white" />
                    <button type='button' className={`text-white font-bold ml-2`} onClick={() => sendEmail(email)} > Send Otp </button>
                    <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full placeholder-white border-b-2 px-1 pt-2 text-xl border-gray-300 pb-2 bg-black text-white" />
                    <input type="text" placeholder="OTP" required onChange={(e) => setOtp(e.target.value)} className="w-full pt-2 px-1 text-xl border-b-2 placeholder-white border-gray-300 pb-2 bg-black text-white" />
                    <button type="submit" className="w-full bg-gray-200 text-black font-bold py-3 rounded-lg">Sign Up</button>
                  </form>
                  <p className="text-center mt-4 text-white ">Already have an account? <button className="text-white" onClick={handler}>Sign In</button></p>
                </div>
              </div>

              {/* Sign In Form */}
              <div className={` w-[60%]  h-[60%] flex shadow-white shadow-[0_0_100px_0] flex-col bg-black rounded-xl overflow-hidden ${visible ? "hidden" : ""}`}>
                <div className="bg-gray-300 py-4 ">
                  <h1 className="text-2xl font-bold text-center text-black">Welcome to Akademix</h1>
                </div>
                <div className={`w-full text-center text-red-500 border-red-2 ${passVisible ? "" : "hidden"}`}><p>Password, email or Otp is incorrect.</p></div>
                <div className="p-6 border-none mt-16 outline-none">
                  <form method="post" onSubmit={onSubmit} className="space-y-6">
                    <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-b-2 px-1 pt-2 text-xl
              pb-2 text-white placeholder-white bg-black " />
                    <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pt-2 px-1 
            text-xl border-b-2 text-white bg-black pb-2 placeholder-white" />
                    <input type="text" placeholder="OTP" required onChange={(e) => setOtp(e.target.value)} className="w-full pt-2 
            px-1 text-xl border-b-2 text-white bg-black pb-2 focus:border-blue-600 placeholder-white" />
                    <button type='button' className={`text-white font-bold ml-2`} onClick={() => sendEmail(email)} > Send Otp </button>

                    <button type="submit" className="w-full  bg-gray-300 text-black  py-3 rounded-lg font-bold">Sign In</button>
                  </form>
                  <p className="text-center text-white mt-4 ">Don't have an account? <button className="text-white font-bold" onClick={handler}>Sign Up</button></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
