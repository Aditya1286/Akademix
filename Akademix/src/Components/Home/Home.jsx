import React from 'react'
import { Outlet } from 'react-router-dom'
import {Sidebar , Navbar} from '../index'
import Tab from './Tab/Tab'

function Home() {
  return (
    <>
       <div className='flex w-full h-screen bg-slate-200'>
          <div className='w-[15vw] overflow-hidden flex flex-1'><Sidebar/></div>
          <div className='gird-div w-[70vw] h-full'>
              <div className='w-full h-[8vh] mb-3'>
                  <Navbar/>
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
          <div className='w-[15vw]'>
            {/* <TodoCalendar/> */}
          </div>
       </div>
      </>
  )
}

export default Home