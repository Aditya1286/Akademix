import React, { useState } from 'react'
import axios from 'axios'

function Login() {
  const [fname, setfname] = useState("")
  const [lname, setLname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState(false)

  const handler = () => {
    setVisible(!visible)
  }
 
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = {
      option: visible,
      firstName: fname,
      lastName: lname,
      email: email,
      password: password,
    }
    handleSubmit(formData)
  }

  // const handleSubmit = async ({formData}) => {
  //   try {
  //     // const { data } = await axios.post("http://localhost:82/Php/register.php", formData, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     console.log("data: ", data)
  //   } catch (error) {
  //     console.log("Form Submit Error", error)
  //   }
  // }

  return (
    <>  
      <div className="bg-gradient-to-r from-gray-200 to-blue-100 min-h-screen flex items-center justify-center p-4 font-sans">
        <div className={`max-w-md w-full dis bg-white rounded-xl shadow-lg overflow-hidden ${visible ? "" : "hidden"}`} id="signup">
          <div className="bg-blue-600 py-4">
            <h1 className="text-2xl font-bold text-center text-white">Create Account</h1>
          </div>
          <div className="p-6">
            <form method="post" onSubmit={onSubmit} className="space-y-6">
              <div className="relative">
                <i className="fas fa-user absolute text-blue-600 left-0 top-3"></i>
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={fname}
                  onChange={(e) => setfname(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-300 pb-2 pl-6 focus:outline-none focus:border-blue-600 transition duration-300"
                />
              </div>
              <div className="relative">
                <i className="fas fa-user absolute text-blue-600 left-0 top-3"></i>
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-300 pb-2 pl-6 focus:outline-none focus:border-blue-600 transition duration-300"
                />
              </div>
              <div className="relative">
                <i className="fas fa-envelope absolute text-blue-600 left-0 top-3"></i>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-300 pb-2 pl-6 focus:outline-none focus:border-blue-600 transition duration-300"
                />
              </div>
              <div className="relative">
                <i className="fas fa-lock absolute text-blue-600 left-0 top-3"></i>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-300 pb-2 pl-6 focus:outline-none focus:border-blue-600 transition duration-300"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg" name="signUp">
                Sign Up
              </button>
            </form>
            
            <div className="relative flex items-center justify-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-600">or continue with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            <div className="flex justify-center space-x-4 mb-6">
              <button className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition duration-300 shadow-sm">
                <i className="fab fa-google text-red-500 mr-2"></i>
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition duration-300 shadow-sm">
                <i className="fab fa-facebook text-blue-600 mr-2"></i>
                <span>Facebook</span>
              </button>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account? 
                <button
                  id="signInButton"
                  type="button"
                  className="text-blue-600 hover:text-blue-800 font-semibold hover:underline ml-1 transition duration-300"
                  onClick={handler}
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className={`max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden ${visible ? "hidden" : ""}`} id="signIn">
          <div className="bg-blue-600 py-4">
            <h1 className="text-2xl font-bold text-center text-white">Akademix</h1>
          </div>
          <div className="p-6">
            <form method="post" onSubmit={onSubmit} className="space-y-6">
              <div className="relative">
                <i className="fas fa-envelope absolute text-blue-600 left-0 top-3"></i>
                <input
                  type="email"
                  name="email"
                  id="signinEmail"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-300 pb-2 pl-6 focus:outline-none focus:border-blue-600 transition duration-300"
                />
              </div>
              <div className="relative">
                <i className="fas fa-lock absolute text-blue-600 left-0 top-3"></i>
                <input
                  type="password"
                  name="password"
                  id="signinPassword"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-300 pb-2 pl-6 focus:outline-none focus:border-blue-600 transition duration-300"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition duration-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg" name="signIn">
                Sign In
              </button>
            </form>
            
            <div className="relative flex items-center justify-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-600">or continue with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            <div className="flex justify-center space-x-4 mb-6">
              <button className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition duration-300 shadow-sm">
                <i className="fab fa-google text-red-500 mr-2"></i>
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition duration-300 shadow-sm">
                <i className="fab fa-facebook text-blue-600 mr-2"></i>
                <span>Facebook</span>
              </button>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have an account? 
                <button
                  id="signUpButton"
                  type="button"
                  className="text-blue-600 hover:text-blue-800 font-semibold hover:underline ml-1 transition duration-300"
                  onClick={handler}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
