import React from 'react'
import { useNavigate } from 'react-router-dom'
function Sidebar() {
    const navigate  = useNavigate()
  return (
    <div className='sidebar w-[25vh] h-[100vh] flex
     bg-gray-300 flex-col p-4'>
        <div className='logo text-3xl mb-8  mt-3 font-bold text-blue-700'>Akademix</div>
        <nav>
        <span className='w-full flex h-[50px] hover:bg-blue-400 gap-5 px-4 justify-left items-center'><i className="fa-solid fa-globe text-2xl"></i><button className=' 
             text-gray-600' onClick={()=>navigate('/home')}>Dashboard</button></span>
            <span className='w-full flex h-[50px] hover:bg-blue-400 gap-5 px-4 justify-left items-center'><i class="fa-solid fa-children text-2xl"></i><button className=' 
             text-gray-600' onClick={()=>navigate('/home')}>Students</button></span>
             <span className='w-full flex h-[50px] hover:bg-blue-400 gap-5 px-4 justify-left items-center'><i className="fa-solid fa-chalkboard-user text-2xl "></i><button className=' 
             text-gray-600' onClick={()=>navigate('/home')}>Teachers</button></span>
             <span className='w-full flex h-[50px] hover:bg-blue-400 gap-7 px-4 justify-left items-center'><i className="fa-solid fa-clipboard-user text-3xl"></i><button className=' 
             text-gray-600' onClick={()=>navigate('/home')}>Staffs</button></span>
             <span className='w-full flex h-[50px] hover:bg-blue-400 gap-7 px-4 justify-left items-center'><i className="fa-solid fa-calendar-days text-2xl"></i><button className=' 
             text-gray-600' onClick={()=>navigate('/home')}>Schedule</button></span>
             <span className='w-full flex h-[50px] hover:bg-blue-400 gap-7 px-4 justify-left items-center'><i className="fa-solid fa-sheet-plastic text-3xl"></i><button className=' 
             text-gray-600' onClick={()=>navigate('/home')}>Exam</button></span>
             <span className='w-full flex h-[50px] hover:bg-blue-400 gap-5 px-4 justify-left items-center'><i className="fa-solid fa-circle-exclamation text-3xl"></i><button className=' 
             text-gray-600' onClick={()=>navigate('/home')}>Notice</button></span>
        </nav>
     </div>
  )
}

export default Sidebar