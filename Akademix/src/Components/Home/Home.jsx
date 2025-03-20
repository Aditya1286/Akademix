import React from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar, Navbar } from '../index'
import Tab from './Tab/Tab'

function Home() {
  const [dataSidebar , setDataSidebar] = useState(false)
  const handleDataFromSidebar = (data) => {
    setDataSidebar(data);
  }
  return (
    <>
      <div className='flex pr-1 w-full h-screen flex-grow bg-slate-200'>
        <div className={` ${dataSidebar?"min-w-0":"max-w-[15vw]"} overflow-hidden flex flex-grow `}>
          <Sidebar sendDataToHome={handleDataFromSidebar}/>
        </div>
        <div className={`grid-div  ${dataSidebar?"min-w-[97%]":"min-w-[85vw]"} transition-all h-full flex-grow`}>
          <div className='w-full h-[8vh]  mb-3 '>
            <Navbar />
          </div>
          <div className='tab w-full h-[8vh] flex gap-2 flex-1 overflow-hidden'>
            <Tab
              name="Students"
              icon="chalkboard-user"
              color="yellow"
            />
            <Tab
              name="Teacher"
              icon="clipboard-user"
              color="yellow"
            />
            <Tab
              name="Staffs"
              icon="chalkboard-user"
              color="yellow"
            />
            <Tab
              name="Awards"
              icon="award"
            />
          </div>
        </div>
        <div>

        </div>
      </div>
    </>
  )
}

export default Home