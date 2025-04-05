import React, { useState } from 'react';
import { Sidebar, Navbar, Subject, Fee, Announcement, Happenings } from '../index';
import { nanoid } from '@reduxjs/toolkit';

function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };
  
  const subjectData = [
    {
        code: "302", 
        description: "Computer Science",
        attendance: "81",
        color: "bg-blue-100"
    },
    {
        code: "321",
        description: "Electronics",
        attendance: "72",
        color: "bg-green-100"
    },
    {
        code: "345",
        description: "Robotics",
        attendance: "47",
        color: "bg-red-100"
    },
    {
        code: "300",
        description: "Mathematics",
        attendance: "89",
        color: "bg-purple-100"
    },
    {
        code: "322",
        description: "DSA",
        attendance: "92",
        color: "bg-yellow-100"
    }
  ];

  const TabButton = ({ name, icon, active = false }) => (
    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
      active 
        ? "bg-blue-600 text-white shadow-md" 
        : "bg-white hover:bg-blue-50 text-gray-700 hover:shadow-sm"
    }`}>
      <span className="font-medium">{name}</span>
    </button>
  );

  const SectionHeader = ({ title }) => (
    <div className="w-full mt-8 mb-4">
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      <div className="w-full h-1 bg-blue-600 mt-2 rounded-full"></div>
    </div>
  );

  const StatsCard = ({ icon, value, label, color }) => (
    <div className={`${color} p-6 rounded-xl shadow-md flex flex-col items-center justify-center transition-all hover:shadow-lg`}>
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-4x  font-bold">{value}</div>
      <div className="text-gray-600 text-sm">{label}</div>
    </div>
  );

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? "w-0 opacity-0" : "w-64 opacity-100"}`}>
        <Sidebar sendDataToHome={handleSidebarToggle} />
      </div>
      
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 overflow-x-hidden`}>
        {/* Navbar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <Navbar />
        </div>
        
        {/* Page Content */}
        <div className="px-6 py-4 md:px-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {/* <TabButton name="Students" icon={faChalkboardUser} active={true} />
            <TabButton name="Teachers" icon={faClipboardUser} />
            <TabButton name="Staff" icon={faChalkboardUser} />
            <TabButton name="Awards" icon={faAward} /> */}
          </div>
          
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
              <Announcement />
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <Happenings />
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-4">
              <h3 className="text-lg font-semibold mb-3">Messages</h3>
              <div className="p-6 flex justify-center items-center text-gray-400">
                <span>No new messages</span>
              </div>
            </div>
          </div>
          
          {/* Courses Section */}
          <SectionHeader title="My Courses" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-4">
              <h3 className="text-lg font-semibold mb-3">Current Subjects</h3>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {subjectData.map((subject) => (
                  <Subject 
                    key={nanoid()} 
                    SubjectDescription={subject.description} 
                    subjectCode={subject.code} 
                    attendance={subject.attendance} 
                    bg={subject.color}
                  />
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <Fee />
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-4">
              <h3 className="text-lg font-semibold mb-3">Assignments</h3>
              <div className="p-6 flex justify-center items-center text-gray-400">
                <span>No pending assignments</span>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-4">
              <h3 className="text-lg font-semibold mb-3">Upcoming Events</h3>
              <div className="p-6 flex justify-center items-center text-gray-400">
                <span>No upcoming events</span>
              </div>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard icon="📚" value="1010" label="Total Assignments" color="bg-blue-50" />
            <StatsCard icon="📅" value="348" label="Active Days" color="bg-orange-50" />
            <StatsCard icon="🏆" value="16" label="Total Contests" color="bg-green-50" />
          </div>
          
          {/* Placement Section */}
          <SectionHeader title="Placement Details" />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden p-4">
              <h3 className="text-lg font-semibold mb-3">Statistics</h3>
              <div className="p-6 flex justify-center items-center text-gray-400">
                <span>Placement statistics will appear here</span>
              </div>
            </div>
            <div className="lg:col-span-3 bg-white rounded-xl shadow-md overflow-hidden p-4">
              <h3 className="text-lg font-semibold mb-3">Drive Details</h3>
              <div className="p-6 flex justify-center items-center text-gray-400">
                <span>Upcoming placement drive details</span>
              </div>
            </div>
          </div>
          
          {/* Authorities Section */}
          <SectionHeader title="Know Your Authorities" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden p-4">
                <div className="flex flex-col items-center justify-center p-6">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mb-4"></div>
                  <h3 className="text-lg font-semibold">Faculty Name</h3>
                  <p className="text-gray-500">Department Head</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;