import React from 'react'
import { useState } from 'react'
function Navbar() {
    const [name , setName] = useState("Adi")
    const [role , setRole] = useState("Admin"   )


    const searchItem = ()=> {
        // Item search Logic
    }
  return (
    <div className='navbar mx-auto w-[50%] rounded-xl h-[10vh] 
    items-center flex justify-between p-10 bg-gray-400'>
        <div className='search w-[20%] h-[3vh] flex gap-2 px-2 items-center rounded-md bg-white'>
        <i class="fa-solid fa-magnifying-glass text-xl" onClick={searchItem}on></i>
            <input type="search" className='w-[100%] text-xl h-[3vh] indent-2 outline-none' />
        </div>
        <div className='flex w-[30%] gap-7 justify-center items-center'>
        <div className='notification'><i class="fa-solid fa-bell"></i></div>
        <div className='flex flex-col justify-center items-center'>
        <div className='User font-bold  '>{name}</div>
        <div className='Role text-gray-800 text-xs'>{role}</div>
        </div>
        <div className='Profile w-[50px] h-[40px] bg-contain'><img src="src/assets/download.jpeg" alt="" className='rounded-full'/></div>
        </div>
    </div>
  )
}

export default Navbar