import React from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar, Navbar , Subject } from '../index'
import Tab from './Tab/Tab'

function Home() {
  const [dataSidebar, setDataSidebar] = useState(false)
  const handleDataFromSidebar = (data) => {
    setDataSidebar(data);
  }
  return (
    <>
      <div className='flex pr-1  w-full h-[300vh] flex-grow bg-slate-200'>
        <div className={` ${dataSidebar ? "min-w-0" : "max-w-[15vw]"}  overflow-hidden flex flex-grow `}>
          <Sidebar sendDataToHome={handleDataFromSidebar} />
        </div>
        <div className={`grid-div  ${dataSidebar ? "min-w-[97%]" : "min-w-[85vw]"} transition-all h-full `}>  {/* Main Section */}
          <div className='w-full h-[8vh] mb-3 '>
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
          <div className='w-full gap-4 h-[40vh] mt-6 rounded-md flex'>  {/*Middle Section Div*/}
            <div className='w-[50%] h-[full] bg-yellow-500 rounded-md '>
              {/* Announcment component */}
            </div>
            <div className='w-[25%] h-full bg-slate-400 rounded-md '>
              {/* Happening component */}
            </div>
            <div className='w-[25%] h-full bg-purple-500  rounded-md'>
              {/* Messages component */}
            </div>
          </div>
          <div className='w-full gap-4 h-[40vh] mt-6 rounded-md flex'>  {/*My Courses Section Div*/}
            <div className='w-[30%] h-full bg-pink-500 rounded-md '>
              {/* My Courses component */}
            </div>
            <div className='w-[20%] h-full bg-green-400 rounded-md '>
              {/* Fee component */}
            </div>
            <div className='w-[25%] h-full bg-red-400 rounded-md '>
              {/* Assignment component */}
            </div>
            <div className='w-[25%] h-full bg-violet-900  rounded-md'>
              {/* Events component */}
            </div>
          </div>
          <div className='w-full h-[10vh] mt-[3%] mb-[1%] '>  {/* Placement Details text */}
            <p className='text-3xl font-medium '>Placement Details</p>
            <div className='w-full h-[3%] bg-gray-500 mt-4'></div> 
          </div>
          <div className='w-full h-[40vh] gap-[1%] flex'>  {/*Placement Section Div*/}
            <div className='w-[40%] h-full  bg-violet-900  rounded-md'>
              {/* Placement component */}
            </div>
            <div className='w-[60%] h-full bg-red-900  rounded-md'>
              {/* Placeent Drive Details component */}
            </div>
          </div>
          <div className='w-full h-[10vh] mt-[3%] mb-[1%] '>  {/* Know your Authorities text div */}
            <p className='text-3xl font-medium '>Know your Authorities</p>
            <div className='w-full h-[3%] bg-gray-500 mt-4'></div>
          </div>
          <div className='w-full h-[40vh] gap-[1%] flex'>  {/* Section Div*/}
            <div className='w-[25%] h-full  bg-violet-400  rounded-md'>
              {/* Placement component */}
            </div>
            <div className='w-[25%] h-full bg-pink-400 rounded-md'>
              {/* Placeent Drive Details component */}
            </div>
            <div className='w-[25%] h-full bg-green-400  rounded-md'>
              {/* Placeent Drive Details component */}
            </div>
            <div className='w-[25%] h-full bg-orange-400  rounded-md'>
              {/* Placeent Drive Details component */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home