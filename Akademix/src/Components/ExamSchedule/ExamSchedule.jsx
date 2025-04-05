import React from 'react';

const ExamSchedule = () => {
  const exams = [
    {
      id: 1,
      course: "CS-301: Data Structures",
      date: "Apr 10, 2025",
      time: "9:00 AM - 12:00 PM",
      room: "Exam Hall A",
      type: "Mid-term",
      format: "Open Book"
    },
    {
      id: 2,
      course: "MATH-202: Linear Algebra",
      date: "Apr 12, 2025",
      time: "2:00 PM - 5:00 PM",
      room: "Exam Hall B",
      type: "Mid-term",
      format: "Closed Book"
    },
    {
      id: 3,
      course: "CS-302: Algorithms",
      date: "Apr 15, 2025",
      time: "9:00 AM - 12:00 PM",
      room: "Exam Hall A",
      type: "Mid-term",
      format: "Open Book"
    },
    {
      id: 4,
      course: "PHY-101: Physics I",
      date: "Apr 18, 2025",
      time: "2:00 PM - 4:00 PM",
      room: "Exam Hall C",
      type: "Quiz",
      format: "Closed Book"
    },
    {
        id: 5,
        course: "CSE-320: Software Engineering",
        date: "Apr 20, 2025",
        time: "2:00 PM - 5:00 PM",
        room: "Exam Hall C",
        type: "Quiz",
        format: "Closed Book"
      }
  ];

  // Helper function to determine format badge color
  const getFormatBadgeClasses = (format) => {
    return format === "Open Book" 
      ? "px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded"
      : "px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded";
  };

  // Helper function to determine type badge color
  const getTypeBadgeClasses = (type) => {
    return type === "Mid-term"
      ? "px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
      : "px-2 py-1 bg-green-100 text-green-800 text-xs rounded";
  };

  return (
    <div className="bg-red-500 w-full h-full  no-scrollbar overflow-y-scroll  shadow-md overflow-hidden">
      <div className="bg-white p-4">
        <div className="divide-y">
          {exams.map((exam) => (
            <div key={exam.id} className="py-3">
              <div className="flex justify-between">
                <h4 className="font-medium">{exam.course}</h4>
                <span className="text-red-600 font-medium">{exam.date}</span>
              </div>
              <p className="text-sm text-gray-600">Time: {exam.time}</p>
              <p className="text-sm text-gray-600">Room: {exam.room}</p>
              <div className="mt-2 flex space-x-2">
                <span className={getTypeBadgeClasses(exam.type)}>{exam.type}</span>
                <span className={getFormatBadgeClasses(exam.format)}>{exam.format}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamSchedule;