import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Sidebar({sendDataToHome}) {
  const navigate = useNavigate()
  const [hidden, setHidden] = useState(true)
  const hide = () => {
    setHidden(!hidden)
    sendDataToHome(hidden)
  }
  return (
    <div className={`w-full relative flex flex-col h-full ${hidden ? "" : "transform -translate-x-[85%]"} transition-all`}>
    <div className={`sidebar w-[13vw] h-[300vh] fixed flex
     bg-white flex-col  rounded-xl overflow-hidden  
     ${hidden ? "" : "transform -translate-x-full"} transition-all`}>
      <div className='logo text-3xl mb-8  flex justify-around mt-3 p-4 font-bold text-blue-700'><p>Akademix</p>
      </div>
      <nav className='p-4'>
        <span className='w-full flex h-[50px]  hover:bg-blue-400 gap-5 px-4 justify-left items-center'><i className="fa-solid fa-globe text-2xl"></i><button className=' 
             text-gray-600' onClick={() => navigate('/home')}>Dashboard</button></span>
        <span className='w-full flex h-[50px] hover:bg-blue-400 gap-5 px-4 justify-left items-center'><i class="fa-solid fa-children text-2xl"></i><button className=' 
             text-gray-600' onClick={() => navigate('/home')}>Students</button></span>
        <span className='w-full flex h-[50px] hover:bg-blue-400 gap-5 px-4 justify-left items-center'><i className="fa-solid fa-chalkboard-user text-2xl "></i><button className=' 
             text-gray-600' onClick={() => navigate('/home')}>Teachers</button></span>
        <span className='w-full flex h-[50px] hover:bg-blue-400 gap-7 px-4 justify-left items-center'><i className="fa-solid fa-clipboard-user text-3xl"></i><button className=' 
             text-gray-600' onClick={() => navigate('/home')}>Staffs</button></span>
        <span className='w-full flex h-[50px] hover:bg-blue-400 gap-7 px-4 justify-left items-center'><i className="fa-solid fa-calendar-days text-2xl"></i><button className=' 
             text-gray-600' onClick={() => navigate('/home')}>Schedule</button></span>
        <span className='w-full flex h-[50px] hover:bg-blue-400 gap-7 px-4 justify-left items-center'><i className="fa-solid fa-sheet-plastic text-3xl"></i><button className=' 
             text-gray-600' onClick={() => navigate('/home')}>Exam</button></span>
        <span className='w-full flex h-[50px] hover:bg-blue-400 gap-5 px-4 justify-left items-center'><i className="fa-solid fa-circle-exclamation text-3xl"></i><button className=' 
             text-gray-600' onClick={() => navigate('/home')}>Notice</button></span>
      </nav>
    </div>
    <div className={`${hidden?"w-[10%]":"w-[40%]"} absolute h-[5%] bg-gradient-to-r from-white to-slate-400  inset-x-[87%] rounded-md 
    flex justify-center items-center text-2xl font-bold inset-y-[10%]`}><button onClick={hide}>{"<"}</button></div>
    </div>
  )
}

export default Sidebar