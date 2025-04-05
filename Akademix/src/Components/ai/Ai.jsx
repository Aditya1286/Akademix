import React, { useState, useEffect } from "react";
// import { IoSend, IoAddCircle, IoStatsChart, IoCalendar } from "react-icons/io5";
// import { RiRobot2Line, RiUserHeartLine, RiTeamLine, RiEarthLine } from "react-icons/ri";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Pro = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setIsResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [impactProjects, setImpactProjects] = useState([
    { id: 1, name: "Community Garden", impact: "Environmental", hours: 12, people: 25, status: "In Progress" },
    { id: 2, name: "Literacy Program", impact: "Educational", hours: 45, people: 120, status: "Completed" },
    { id: 3, name: "Food Drive", impact: "Humanitarian", hours: 20, people: 50, status: "Planned" }
  ]);
  const [activeTab, setActiveTab] = useState("chat");
  const [newProject, setNewProject] = useState({ name: "", impact: "", hours: 0, people: 0, status: "Planned" });
  const [totalImpact, setTotalImpact] = useState({ hours: 0, people: 0, projects: 0 });
  const [isLoading, setIsLoading] = useState(false);
  
  const exampleQuestions = [
    "How do I measure the impact of my volunteer work?",
    "What are the best local community initiatives I can join?",
    "How can I organize a successful community cleanup?",
    "What metrics should I track for my educational outreach program?"
  ];

  useEffect(() => {
    const hours = impactProjects.reduce((sum, project) => sum + project.hours, 0);
    const people = impactProjects.reduce((sum, project) => sum + project.people, 0);
    setTotalImpact({
      hours,
      people,
      projects: impactProjects.length
    });
  }, [impactProjects]);

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    } else {
      alert("Please write something first!");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && message) {
      hitRequest();
    }
  };

  const handleExampleClick = (question) => {
    setMessage(question);
    generateResponse(question);
  };

  const generateResponse = async (msg) => {
    if (!msg) return;
    const newMessages = [...messages, { type: "userMsg", text: msg }];
    setMessages(newMessages);
    setIsResponseScreen(true);
    setMessage("");
    setIsLoading(true);

    const genAI = new GoogleGenerativeAI(
      "AIzaSyB5uSgFLHoU9VDEViWMgfwrTmzRe3XfxKc"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a social impact assistant named "ImpactTracker." You help users track and maximize their social impact initiatives,
      volunteer work, and community engagement. Provide guidance on measuring impact, finding volunteer opportunities, 
      organizing community projects, and tracking progress. If a user asks about any unrelated topic, politely respond with:
      "I'm here to help with your social impact initiatives. Please ask about tracking impact, finding volunteer opportunities, 
      or organizing community projects."
    `;

    try {
      const result = await model.generateContent(`${prompt}\nUser: ${msg}`);
      const responseText = result.response?.text() || "Sorry, I couldn't process your request.";
    
      setMessages([...newMessages, { type: "responseMsg", text: responseText }]);
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const newChat = () => {
    setIsResponseScreen(false);
    setMessages([]);
    setActiveTab("chat");
  };

  const addProject = () => {
    if (newProject.name && newProject.impact) {
      setImpactProjects([
        ...impactProjects,
        {
          id: Date.now(),
          name: newProject.name,
          impact: newProject.impact,
          hours: parseInt(newProject.hours) || 0,
          people: parseInt(newProject.people) || 0,
          status: newProject.status
        }
      ]);
      setNewProject({ name: "", impact: "", hours: 0, people: 0, status: "Planned" });
    } else {
      alert("Project name and impact area are required!");
    }
  };

  const deleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setImpactProjects(impactProjects.filter(project => project.id !== id));
    }
  };

  const updateProjectStatus = (id, status) => {
    setImpactProjects(impactProjects.map(project => 
      project.id === id ? {...project, status} : project
    ));
  };

  return (
    <>
      <div className="w-screen h-screen pb-[100px] overflow-y-scroll scrollbar-hidden bg-[#0E0E0E] text-white">
        <div className="header pt-[25px] flex items-center justify-between w-full px-4 md:px-[50px] lg:px-[100px]">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center">
            {/* <RiEarthLine className="mr-2 text-green-500" />  */}
            Social Impact Tracker
          </h2>
          
          <div className="flex gap-2">
            <button
              className={`p-2 rounded-[30px] cursor-pointer text-[14px] transition-colors duration-200 ${activeTab === "chat" ? "bg-green-700 hover:bg-green-600" : "bg-[#181818] hover:bg-[#242424]"}`}
              onClick={() => setActiveTab("chat")}
            >
              Assistant
            </button>
            <button
              className={`p-2 rounded-[30px] cursor-pointer text-[14px] transition-colors duration-200 ${activeTab === "projects" ? "bg-green-700 hover:bg-green-600" : "bg-[#181818] hover:bg-[#242424]"}`}
              onClick={() => setActiveTab("projects")}
            >
              Projects
            </button>
            <button
              className={`p-2 rounded-[30px] cursor-pointer text-[14px] transition-colors duration-200 ${activeTab === "impact" ? "bg-green-700 hover:bg-green-600" : "bg-[#181818] hover:bg-[#242424]"}`}
              onClick={() => setActiveTab("impact")}
            >
              Impact
            </button>
            {isResponseScreen && activeTab === "chat" && (
              <button
                id="newChatBtn"
                className="bg-[#181818] p-2 rounded-[30px] cursor-pointer text-[14px] hover:bg-[#242424] transition-colors duration-200"
                onClick={newChat}
              >
                New Chat
              </button>
            )}
          </div>
        </div>

        {activeTab === "chat" && !isResponseScreen && (
          <div className="min-w-full h-[80vh] flex items-center flex-col justify-center px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Track Your Social Impact</h1>
            <div className="boxes my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
              {exampleQuestions.map((question, index) => (
                <div 
                  key={index}
                  className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[15vh] bg-[#181818] p-[15px] border border-gray-800 hover:border-green-700"
                  onClick={() => handleExampleClick(question)}
                >
                  <p className="text-[16px] md:text-[18px]">
                    {question}
                  </p>
                  <i className="absolute right-3 bottom-3 text-[18px] text-green-500">
                    {/* <RiRobot2Line /> */}
                  </i>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "chat" && isResponseScreen && (
          <div className="px-4 md:px-8 mt-4">
            <div className="messages">
              {messages?.map((msg, index) => {
                return (
                  <div key={index} className={`mssg ${msg.type} p-4 my-4 rounded-lg ${msg.type === "userMsg" ? "bg-[#181818] ml-auto max-w-[80%] border-l-4 border-green-700" : "bg-[#1e3a1e] mr-auto max-w-[80%] border-l-4 border-green-500"}`}>
                    {msg.text}
                  </div>
                );
              })}
              {isLoading && (
                <div className="mssg responseMsg p-4 my-4 rounded-lg bg-[#1e3a1e] mr-auto max-w-[80%] border-l-4 border-green-500">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="px-4 md:px-8 mt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 bg-[#181818] p-4 rounded-lg shadow-lg border border-gray-800">
                <h3 className="text-xl font-bold mb-4 flex items-center text-green-500">
                  {/* <IoAddCircle className="mr-2" />  */}
                  Add New Project
                </h3>
                <div className="flex flex-col gap-3">
                  <input 
                    type="text" 
                    placeholder="Project Name" 
                    className="p-2 bg-[#242424] rounded outline-none focus:ring-1 focus:ring-green-500 transition-all"
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  />
                  <select 
                    className="p-2 bg-[#242424] rounded outline-none focus:ring-1 focus:ring-green-500 transition-all"
                    value={newProject.impact}
                    onChange={(e) => setNewProject({...newProject, impact: e.target.value})}
                  >
                    <option value="">Select Impact Area</option>
                    <option value="Environmental">Environmental</option>
                    <option value="Educational">Educational</option>
                    <option value="Humanitarian">Humanitarian</option>
                    <option value="Health">Health</option>
                    <option value="Cultural">Cultural</option>
                  </select>
                  <input 
                    type="number" 
                    placeholder="Volunteer Hours" 
                    className="p-2 bg-[#242424] rounded outline-none focus:ring-1 focus:ring-green-500 transition-all"
                    value={newProject.hours}
                    onChange={(e) => setNewProject({...newProject, hours: e.target.value})}
                  />
                  <input 
                    type="number" 
                    placeholder="People Impacted" 
                    className="p-2 bg-[#242424] rounded outline-none focus:ring-1 focus:ring-green-500 transition-all"
                    value={newProject.people}
                    onChange={(e) => setNewProject({...newProject, people: e.target.value})}
                  />
                  <select 
                    className="p-2 bg-[#242424] rounded outline-none focus:ring-1 focus:ring-green-500 transition-all"
                    value={newProject.status}
                    onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                  >
                    <option value="Planned">Planned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                  <button 
                    className="p-2 bg-green-700 rounded-lg mt-2 hover:bg-green-600 transition-colors duration-200 font-medium"
                    onClick={addProject}
                  >
                    Add Project
                  </button>
                </div>
              </div>
              
              <div className="w-full md:w-2/3 bg-[#181818] p-4 rounded-lg shadow-lg border border-gray-800">
                <h3 className="text-xl font-bold mb-4 flex items-center text-green-500">
                  {/* <IoCalendar className="mr-2" /> */}
                   Your Impact Projects
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="p-2 text-left">Project</th>
                        <th className="p-2 text-left">Impact Area</th>
                        <th className="p-2 text-center">Hours</th>
                        <th className="p-2 text-center">People</th>
                        <th className="p-2 text-center">Status</th>
                        <th className="p-2 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {impactProjects.length > 0 ? (
                        impactProjects.map((project) => (
                          <tr key={project.id} className="border-b border-gray-700 hover:bg-[#242424] transition-colors">
                            <td className="p-2">{project.name}</td>
                            <td className="p-2">{project.impact}</td>
                            <td className="p-2 text-center">{project.hours}</td>
                            <td className="p-2 text-center">{project.people}</td>
                            <td className="p-2 text-center">
                              <select 
                                className="bg-[#242424] p-1 rounded focus:ring-1 focus:ring-green-500 transition-all"
                                value={project.status}
                                onChange={(e) => updateProjectStatus(project.id, e.target.value)}
                              >
                                <option value="Planned">Planned</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="On Hold">On Hold</option>
                              </select>
                            </td>
                            <td className="p-2 text-center">
                              <button 
                                className="bg-red-700 p-1 px-2 rounded hover:bg-red-600 transition-colors"
                                onClick={() => deleteProject(project.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="p-4 text-center text-gray-500">No projects yet. Add your first project!</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "impact" && (
          <div className="px-4 md:px-8 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#181818] p-6 rounded-lg text-center shadow-lg border border-gray-800 hover:border-green-700 transition-all">
                <div className="text-4xl font-bold text-green-500 mb-2">{totalImpact.hours}</div>
                <div className="text-xl">Volunteer Hours</div>
              </div>
              <div className="bg-[#181818] p-6 rounded-lg text-center shadow-lg border border-gray-800 hover:border-green-700 transition-all">
                <div className="text-4xl font-bold text-green-500 mb-2">{totalImpact.people}</div>
                <div className="text-xl">People Impacted</div>
              </div>
              <div className="bg-[#181818] p-6 rounded-lg text-center shadow-lg border border-gray-800 hover:border-green-700 transition-all">
                <div className="text-4xl font-bold text-green-500 mb-2">{totalImpact.projects}</div>
                <div className="text-xl">Projects</div>
              </div>
            </div>
            
            <div className="mt-8 bg-[#181818] p-6 rounded-lg shadow-lg border border-gray-800">
              <h3 className="text-xl font-bold mb-4 flex items-center text-green-500">
                {/* <IoStatsChart className="mr-2" />  */}
                Impact Breakdown
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="p-2 text-left">Impact Area</th>
                      <th className="p-2 text-center">Projects</th>
                      <th className="p-2 text-center">Total Hours</th>
                      <th className="p-2 text-center">People Reached</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Environmental', 'Educational', 'Humanitarian', 'Health', 'Cultural'].map(area => {
                      const areaProjects = impactProjects.filter(p => p.impact === area);
                      if (areaProjects.length === 0) return null;
                      
                      const areaHours = areaProjects.reduce((sum, p) => sum + p.hours, 0);
                      const areaPeople = areaProjects.reduce((sum, p) => sum + p.people, 0);
                      
                      return (
                        <tr key={area} className="border-b border-gray-700 hover:bg-[#242424] transition-colors">
                          <td className="p-2">{area}</td>
                          <td className="p-2 text-center">{areaProjects.length}</td>
                          <td className="p-2 text-center">{areaHours}</td>
                          <td className="p-2 text-center">{areaPeople}</td>
                        </tr>
                      );
                    })}
                    {!impactProjects.length && (
                      <tr>
                        <td colSpan="4" className="p-4 text-center text-gray-500">No impact data yet. Add projects to see your impact breakdown.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mt-8 bg-[#181818] p-6 rounded-lg shadow-lg border border-gray-800">
              <h3 className="text-xl font-bold mb-4 flex items-center text-green-500">
                {/* <RiTeamLine className="mr-2" />  */}
                Project Status Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['Planned', 'In Progress', 'Completed', 'On Hold'].map(status => {
                  const statusCount = impactProjects.filter(p => p.status === status).length;
                  const statusPercentage = impactProjects.length ? Math.round((statusCount / impactProjects.length) * 100) : 0;
                  
                  return (
                    <div key={status} className="bg-[#242424] p-4 rounded-lg hover:bg-[#303030] transition-colors border border-gray-700">
                      <div className="text-lg font-semibold">{status}</div>
                      <div className="text-2xl font-bold mt-1">{statusCount}</div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${statusPercentage}%` }}></div>
                      </div>
                      <div className="text-sm mt-1">{statusPercentage}% of projects</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 z-10 w-full flex flex-col items-center">
          <div className="p-4 bg-[#0E0E0E] flex justify-center w-full h-30">
            {activeTab === "chat" && (
              <div className="inputBox w-full max-w-3xl text-[15px] py-[7px] flex items-center bg-[#181818] rounded-[30px] border border-gray-800 focus-within:border-green-700 transition-all shadow-lg">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  type="text"
                  className="p-[10px] pl-[15px] bg-transparent flex-1 outline-none border-none"
                  placeholder="Ask about tracking impact, volunteer opportunities, or project ideas..."
                  id="messageBox"
                />
                {message !== "" && (
                  <i
                    className="text-green-500 text-[20px] mr-5 cursor-pointer hover:text-green-400 transition-colors"
                    onClick={hitRequest}
                  >
                    {/* <IoSend /> */}
                  </i>
                )}
              </div>
            )}
            <p className="text-gray-500 text-[14px] mt-2 max-w-3xl text-center">
              I am your Social Impact Tracker Assistant, here to help you measure and maximize your community initiatives, 
              volunteer work, and social impact projects.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pro;