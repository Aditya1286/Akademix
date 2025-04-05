import React from 'react';

const WeeklyTimetable = () => {
  const schedule = [
    {
      time: '9:00-10:30',
      monday: 'CS-301',
      tuesday: 'MATH-201',
      wednesday: 'ENG-102',
      thursday: 'PHY-101',
      friday: 'CS-305'
    },
    {
      time: '10:45-12:15',
      monday: 'ECON-201',
      tuesday: 'CS-302',
      wednesday: 'MATH-202',
      thursday: 'CS-304',
      friday: 'Lab'
    },
    {
      time: '1:00-2:30',
      monday: 'CS-303',
      tuesday: 'Lab',
      wednesday: 'CS-301',
      thursday: 'ECON-201',
      friday: 'PHY-101'
    },
    {
      time: '2:45-4:15',
      monday: 'Lab',
      tuesday: 'CS-305',
      wednesday: 'CS-302',
      thursday: 'Project',
      friday: 'CS-303'
    }
  ];
  
  // Map course codes to their colors for visual distinction
  const getCourseColor = (course) => {
    const courseColors = {
      'CS-301': 'bg-blue-50',
      'CS-302': 'bg-green-50',
      'CS-303': 'bg-yellow-50',
      'CS-304': 'bg-indigo-50',
      'CS-305': 'bg-purple-50',
      'MATH-201': 'bg-pink-50',
      'MATH-202': 'bg-red-50',
      'ENG-102': 'bg-orange-50',
      'PHY-101': 'bg-cyan-50',
      'ECON-201': 'bg-teal-50',
      'Lab': 'bg-violet-50',
      'Project': 'bg-amber-50'
    };
    
    return courseColors[course] || '';
  };

  return (
    <div className="bg-blue-500 shadow-lg overflow-y-scroll no-scrollbar overflow-hidden max-w-6xl mx-auto w-full h-full ">
      <div className="bg-white p-4 md:p-6">
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-100 w-full ">
                <th className="py-3 px-4 text-left font-bold text-blue-800">Time</th>
                <th className="py-3 px-4 text-center font-bold text-blue-800">Monday</th>
                <th className="py-3 px-4 text-center font-bold text-blue-800">Tuesday</th>
                <th className="py-3 px-4 text-center font-bold text-blue-800">Wednesday</th>
                <th className="py-3 px-4 text-center font-bold text-blue-800">Thursday</th>
                <th className="py-3 px-4 text-center font-bold text-blue-800">Friday</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {schedule.map((row, index) => (
                <tr key={index} className={index < schedule.length - 1 ? "border-b" : ""}>
                  <td className="py-3 px-4 font-medium bg-gray-50">{row.time}</td>
                  <td className={`py-3 px-4 text-center ${getCourseColor(row.monday)} hover:bg-opacity-80 transition-colors`}>{row.monday}</td>
                  <td className={`py-3 px-4 text-center ${getCourseColor(row.tuesday)} hover:bg-opacity-80 transition-colors`}>{row.tuesday}</td>
                  <td className={`py-3 px-4 text-center ${getCourseColor(row.wednesday)} hover:bg-opacity-80 transition-colors`}>{row.wednesday}</td>
                  <td className={`py-3 px-4 text-center ${getCourseColor(row.thursday)} hover:bg-opacity-80 transition-colors`}>{row.thursday}</td>
                  <td className={`py-3 px-4 text-center ${getCourseColor(row.friday)} hover:bg-opacity-80 transition-colors`}>{row.friday}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-medium text-blue-800 mb-2">Notes:</h4>
          <p className="mb-1">• Lab sessions are held in Room L-102</p>
          <p>• Project sessions are for team meetings in Room C-301</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyTimetable;