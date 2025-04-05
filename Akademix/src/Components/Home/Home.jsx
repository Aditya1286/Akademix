import React from 'react'

import { useState } from 'react'
import { Sidebar, Navbar , Subject , Fee , Announcement, Happenings , Authorities} from '../index'
import Tab from './Tab/Tab'
import { nanoid } from '@reduxjs/toolkit'

function Home() {
  const [dataSidebar, setDataSidebar] = useState(false)
  const handleDataFromSidebar = (data) => {
    setDataSidebar(data);
  }
  const tempData = [
    {
        code: "302", 
        description: "Computer Science ",
        Attendance: "81",
    },
    {
        code: "321",
        description: "Electronics",
        Attendance: "72",
    },
    {
        code: "345",
        description: "Robotics",
        Attendance: "47"
    },
    {
        code: "300",
        description: "Mathematics",
        Attendance: "89"
    },
    {
        code: "322",
        description: "DSA",
        Attendance: "92"
    }
]

  const authoritiesInfo = [
     {
      imageLink: "src/assets/AuthoritiesImg/dog1.jpg",
      Name: "Adi",
      Designation: "Head of School",
      contact: "1829320212",
      Role: "Assistant Professor",

     },
     {
      imageLink: "src/assets/AuthoritiesImg/dog2.jpg",
      Name: "Aditya",
      Designation: "Head of School",
      contact: "1829320212",
      Role: "Assistant Professor",
     },
     {
      imageLink: "src/assets/AuthoritiesImg/dog3.jpg",
      Name: "Aishwarya",
      Designation: "Head of School",
      contact: "1829320212",
      Role: "Assistant Professor",
     },
     {
      imageLink: "src/assets/AuthoritiesImg/dog4.jpg",
      Name: "Bihari",
      Designation: "Head of School",
      contact: "1829320212",
      Role: "Assistant Professor",
     },
     {
      imageLink: "src/assets/AuthoritiesImg/dog5.jpg",
      Name: "Dog 1",
      Designation: "Head of School",
      contact: "1829320212",
      Role: "Assistant Professor",
     }

  ]
  return (
    <>
      <div className='flex pr-1  w-full h-[300vh] flex-grow  bg-slate-200 '>
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
              data="423"
              // style="motion-translate-y-in-100 motion-loop-once motion-duration-[1s] motion-ease-spring-smooth motion-delay-0 motion-blur-md"
            />
            <Tab
              name="Teacher"
              icon="clipboard-user"
              color="yellow"
              data="118"
              // style="motion-translate-y-in-100 motion-loop-once motion-duration-[1s] motion-ease-spring-smooth motion-delay-75 motion-blur-md "

            />
            <Tab
              name="Staffs"
              icon="chalkboard-user"
              color="yellow"
              data="256"
              // style="motion-translate-y-in-100 motion-loop-once motion-duration-[1s] motion-ease-spring-smooth motion-delay-100 motion-blur-md"
 
            />
            <Tab
              name="Awards"
              icon="award"
              data="767"
              // style="motion-translate-y-in-100 motion-loop-once motion-duration-[1s] motion-ease-spring-smooth motion-delay-150 motion-blur-md"

            />
          </div>
          <div className='w-full gap-4 h-[40vh] mt-6 rounded-md flex'>  {/*Middle Section Div*/}
            <div className='w-[50%] bg-contain z-0 shadow-gray-400 shadow-[0_0_20px_0.25rem] h-full overflow-hidden rounded-md '>
              <Announcement/>
            </div>
            <div className='w-[25%] h-full rounded-md '>
              <Happenings/>
            </div>
            <div className='w-[25%] h-full bg-purple-500  rounded-md'>
              {/* Messages component */}
            </div>
          </div>
          <div className='w-full gap-3  h-[40vh] mt-6 rounded-md flex'>  {/*My Courses Section Div*/}
            <div className='w-[30%] h-auto bg-white border-gray-400 border-4 shadow-gray-400 
             shadow-[0_0_20px_0.25rem] overflow-y-scroll no-scrollbar flex-col flex gap-3 '>
               <div className='w-full h-[10%] flex  justify-center items-center bg-orange-400'>
                  <p className='font-bold text-xl'>Attendance</p>
              </div>
                {tempData.map((e)=>(
                  <div key={nanoid()}>
                          <Subject SubjectDescription={e.description} subjectCode={e.code} attendance={e.Attendance} bg={false}/>
                    </div>
                ))}
            </div>
            <div className='w-[20%] h-full  shadow-gray-400 shadow-[0_0_20px_0.25rem] overflow-hidden rounded-md '>
                <Fee/>
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
          <div className='w-full h-[40vh] gap-[1%] flex'>  {/* Know your authorities component Div*/}
            <div className='w-[25%] h-full  rounded-md border-gray-400 border-4 shadow-gray-400 shadow-[0_0_20px_0.25rem]'>
              <Authorities info={{...authoritiesInfo[0]}} />
            </div>
            <div className='w-[25%] h-full rounded-md border-gray-400 border-4 shadow-gray-400 shadow-[0_0_20px_0.25rem]'>
            <Authorities info={{...authoritiesInfo[1]}} />
            </div>
            <div className='w-[25%] h-full  rounded-md border-gray-400 border-4 shadow-gray-400 shadow-[0_0_20px_0.25rem]'>
            <Authorities info={{...authoritiesInfo[2]}} />
            </div>
            <div className='w-[25%] h-full rounded-md border-gray-400 border-4 shadow-gray-400 shadow-[0_0_20px_0.25rem]'>
            <Authorities info={{...authoritiesInfo[3]}} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home