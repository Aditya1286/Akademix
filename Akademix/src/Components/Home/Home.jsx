import React from 'react'
import { useState } from 'react'
import { Sidebar, Navbar , Subject , RecentMessages , StudentPathwayChart,  Fee , Announcement, Happenings , Authorities , Footer , ExamSchedule , WeeklyTimetable , ChatbotWithEmoji} from '../index'
import Tab from './Tab/Tab'
import { nanoid } from '@reduxjs/toolkit'

function Home() {
  const [dataSidebar, setDataSidebar] = useState(false)
  const handleDataFromSidebar = (data) => {
    setDataSidebar(data);
  }

  const images = [
    {url: "src/assets/images/1.jpeg"},
    {url: "src/assets/images/2.jpeg"},
    {url: "src/assets/images/3.jpeg"},
    {url: "src/assets/images/4.jpeg"},
]
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
const motivation = [
  {url: "src/assets/motivation/1.jpeg"},
  {url: "src/assets/motivation/2.jpeg"},
  {url: "src/assets/motivation/3.jpeg"},
  {url: "src/assets/motivation/4.jpeg"},
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
      Name: "Raj",
      Designation: "Head of Department",
      contact: "1829313213",
      Role: "Mentor",
     },
     {
      imageLink: "src/assets/AuthoritiesImg/dog3.jpg",
      Name: "Naaz",
      Designation: "Head of Faculty",
      contact: "78423842784",
      Role: "Front-End Professor",
     },
     {
      imageLink: "src/assets/AuthoritiesImg/dog4.jpg",
      Name: "Nishant",
      Designation: "Principal",
      contact: "60053242423",
      Role: "Event Organiser",
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
      <div className='flex pr-1  w-full h-[250vh] flex-grow  bg-slate-200 '>
      <ChatbotWithEmoji />
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
              <Announcement images={images}/>
            </div>
            <div className='w-[25%] h-full rounded-md '>
            <div className='w-full h-[15%] rounded-tl-md rounded-tr-md shadow-gray-400 
             shadow-[0_0_20px_0.25rem] bg-orange-400 flex justify-center items-center text-lg text-white font-bold'><p>Happenings</p></div>
                <div className='w-full h-[85%]'>
                <Happenings/>
                </div>
            </div>
            <div className='w-[25%] h-full bg-purple-500  rounded-md'>
            <div className='w-full h-[15%] rounded-tl-md rounded-tr-md shadow-gray-400 
             shadow-[0_0_20px_0.25rem] bg-orange-400 flex justify-center items-center text-lg text-white font-bold'><p>Messages</p></div>
             <div className='w-full h-[85%]'>            
                <RecentMessages />
             </div>
            </div>
          </div>
          <div className='w-full gap-3  h-[40vh] mt-6 rounded-md flex'>  {/*My Courses Section Div*/}
            <div className='w-[30%] h-full bg-white rounded-tl-md rounded-tr-md shadow-gray-400 
             shadow-[0_0_20px_0.25rem] '>
              <div className='w-full h-[15%] rounded-tl-md rounded-tr-md bg-orange-400 flex justify-center items-center text-lg text-white font-bold'><p>Attendance</p></div>
              <div className='w-full h-[85%] overflow-y-scroll no-scrollbar flex-col flex gap-3 '>
              {tempData.map((e)=>(  
                  <div key={nanoid()}>
                          <Subject SubjectDescription={e.description} subjectCode={e.code} attendance={e.Attendance} bg={false}/>
                    </div>
                ))}
              </div>
                
            </div>
            <div className='w-[20%] h-full  shadow-gray-400 shadow-[0_0_20px_0.25rem] overflow-hidden rounded-md '>
            <div className='w-full h-[15%] rounded-tl-md rounded-tr-md bg-orange-400 flex justify-center items-center text-lg text-white font-bold'><p>Fee</p></div>
            <div className='w-full h-[85%] '>
            <Fee/>

            </div>
            </div>
            <div className='w-[25%] h-full shadow-gray-400 shadow-[0_0_20px_0.25rem]  bg-red-400 rounded-md '>
            <div className='w-full h-[15%] rounded-tl-md rounded-tr-md bg-orange-400 flex justify-center items-center text-lg text-white font-bold'><p>Time Table</p></div>
                <div className='w-full h-[85%]'>
                  <WeeklyTimetable />
                </div>
            </div>
            <div className='w-[25%] h-full shadow-gray-400 
             shadow-[0_0_20px_0.25rem]  rounded-md'>
              <div className='w-full h-[15%] rounded-tl-md rounded-tr-md bg-orange-400 flex justify-center items-center text-lg text-white font-bold'><p>Upcoming Exams</p></div>
              <div className='w-full h-[85%]'><ExamSchedule/></div>
              
            </div>
          </div>
          <div className='w-full h-[10vh] mt-[3%] mb-[1%] '>  {/* Placement Details text */}
            <p className='text-3xl font-medium '>Placement Details</p>
            <div className='w-full h-[3%] bg-gray-500 mt-4'></div> 
          </div>
          <div className='w-full h-[40vh] gap-[1%] flex '>  {/*Placement Section Div*/}
            <div className='w-[60%] h-full shadow-gray-400 shadow-[0_0_20px_0.25rem] rounded-md'>
            <StudentPathwayChart />
            </div>
            <div className='w-[40%] h-full bg-red-900 shadow-gray-400 shadow-[0_0_20px_0.25rem] rounded-md'>
                <div className='w-full h-[100%] object-cover'>
                  <Announcement images={motivation}/>
                </div>
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
          </div>  {/* Ai assistant*/}
          <div className='w-full h-[40vh] bg-red-400 mt-[4%]'> 
                <Footer />
          </div>

        </div>
      </div>
    </>
  )
}

export default Home