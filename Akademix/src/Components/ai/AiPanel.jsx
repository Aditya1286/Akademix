import React, { useState, useEffect } from "react";
import { Send, Bot, Trash2, BookOpen, GraduationCap, Clock, History, ExternalLink } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai"; 
import { NavLink} from "react-router-dom";

const AiPanel = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  
  const genAI = new GoogleGenerativeAI(
    "AIzaSyB5uSgFLHoU9VDEViWMgfwrTmzRe3XfxKc"
  );
  
  // Load chat history from local storage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('akademixChatHistory');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([
        { type: "bot", text: "Hi there! I'm your Akademix Study Assistant. How can I help you today with your studies? Feel free to ask me any academic questions." }
      ]);
    }
  }, []);
  
  // Save messages to local storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('akademixChatHistory', JSON.stringify(messages));
    }
  }, [messages]);
  
  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear your chat history?")) {
      localStorage.removeItem('akademixChatHistory');
      setMessages([
        { type: "bot", text: "Hi there! I'm your Akademix Study Assistant. How can I help you today with your studies? Feel free to ask me any academic questions." }
      ]);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    generateResponse(message);
  };
  
  const generateResponse = async (msg) => {
    if (!msg) return;
    setMessages((prevMessages) => [...prevMessages, { type: "user", text: msg }]);
    setIsLoading(true);
    setMessage("");
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `
      You are Akademix, a Study Assistant chatbot designed to help students with academic questions. 
      Your responses should be clear, concise, and educational. If a student asks a question, provide a well-structured answer.
      If a question is unclear, politely ask for clarification. Avoid answering non-academic queries.
      `;
      const result = await model.generateContent(`${prompt}\nUser: ${msg}`);
      const responseText = result.response?.text() || "Sorry, I couldn't process your request.";
      setMessages((prevMessages) => [...prevMessages, { type: "bot", text: responseText }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prevMessages) => [...prevMessages, { type: "bot", text: "Oops! Something went wrong. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Sample suggestion prompts
  const suggestions = [
    "Explain photosynthesis in simple terms",
    "What are the key differences between mitosis and meiosis?", 
    "Help me understand the quadratic formula",
    "Explain Newton's laws of motion",
    "What's the significance of Shakespeare's Hamlet?"
  ];

  // Sample recent questions (would normally be populated from storage)
  const recentQuestions = [
    "How does cellular respiration work?",
    "Explain the water cycle",
    "What caused World War I?",
    "Help me with trigonometric identities"
  ];
  
  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap size={28} />
            <h1 className="text-2xl font-bold">Akademix</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/resource" className="hover:underline font-medium flex items-center"><BookOpen size={18} className="mr-1" /> Resources</NavLink>
            <a href="#" className="hover:underline font-medium flex items-center"><History size={18} className="mr-1" /> Study History</a>          </nav>
          {/* Mobile menu button would go here */}
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="font-semibold text-lg mb-3 flex items-center">
              <BookOpen size={18} className="mr-2 text-orange-500" /> Study Topics
            </h2>
            <div className="space-y-2">
              {["Mathematics", "Science", "History", "Literature", "Physics", "Chemistry"].map(topic => (
                <button 
                  key={topic}
                  className="w-full text-left p-2 rounded hover:bg-orange-50 text-gray-700 hover:text-orange-500 transition"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="font-semibold text-lg mb-3 flex items-center">
              <Clock size={18} className="mr-2 text-orange-500" /> Recent Questions
            </h2>
            <div className="space-y-2">
              {recentQuestions.map((q, i) => (
                <button 
                  key={i}
                  className="w-full text-left p-2 rounded hover:bg-orange-50 text-gray-700 hover:text-orange-500 transition text-sm truncate"
                  onClick={() => generateResponse(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="font-semibold text-lg mb-3">Need Help?</h2>
            <p className="text-sm text-gray-600 mb-3">
              Having trouble with your studies? Connect with a live tutor for personalized assistance.
            </p>
            <NavLink
              to="/counselling" 
              className="flex items-center justify-center w-full bg-orange-100 text-orange-600 p-2 rounded font-medium hover:bg-orange-200 transition">
                              <ExternalLink size={16} className="mr-2"  /> Connect with Tutor

              </NavLink>
          </div>
        </aside>
        
        {/* Main chat area */}
        <section className="w-full md:w-3/4 bg-white rounded-lg shadow-md flex flex-col">
          {/* Tabs */}
          <div className="border-b">
            <div className="flex">
              <button 
                className={`py-3 px-6 font-medium flex items-center ${activeTab === 'chat' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-orange-400'}`}
                onClick={() => setActiveTab('chat')}
              >
                <Bot size={18} className="mr-2" /> Chat
              </button>
              <button 
                className={`py-3 px-6 font-medium flex items-center ${activeTab === 'examples' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-orange-400'}`}
                onClick={() => setActiveTab('examples')}
              >
                <BookOpen size={18} className="mr-2" /> Examples
              </button>
            </div>
          </div>
          
          {activeTab === 'chat' ? (
            <>
              {/* Messages container */}
              <div 
                id="messages-container"
                className="flex-grow overflow-y-auto p-4"
                style={{ maxHeight: 'calc(100vh - 250px)' }}
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`my-3 p-3 rounded-lg max-w-[80%] ${
                      msg.type === "user"
                        ? "bg-orange-400 text-white ml-auto"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.type === "bot" && <Bot className="inline-block mr-1 text-orange-500" size={16} />}
                    <span className="whitespace-pre-wrap">{msg.text}</span>
                  </div>
                ))}
                {isLoading && (
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[80%] my-3">
                    <Bot className="inline-block mr-1 text-orange-500" size={16} />
                    <span className="animate-pulse">Typing...</span>
                  </div>
                )}
              </div>
              
              {/* Suggestions */}
              {messages.length <= 2 && (
                <div className="p-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-2">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => generateResponse(suggestion)}
                        className="bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-600 px-3 py-2 rounded-full text-sm transition"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Input area */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold">Ask Your Study Doubts</h2>
                  <button 
                    onClick={clearHistory}
                    className="text-sm text-gray-500 flex items-center hover:text-red-500 transition"
                  >
                    <Trash2 size={14} className="mr-1" /> Clear chat
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="flex">
                  <input
                    type="text"
                    className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
                    placeholder="Ask a question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    className={`bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-3 rounded-r-lg flex items-center transition ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-orange-500 hover:to-orange-600'
                    }`}
                    disabled={isLoading}
                  >
                    <Send size={18} className="mr-2" /> Send
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Example Questions</h2>
              <p className="text-gray-600 mb-6">Here are some questions that Akademix can help you with:</p>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4 hover:border-orange-300 hover:bg-orange-50 transition cursor-pointer">
                  <h3 className="font-medium text-orange-600">Mathematics</h3>
                  <p className="text-gray-700">Can you explain how to solve quadratic equations step by step?</p>
                </div>
                
                <div className="border rounded-lg p-4 hover:border-orange-300 hover:bg-orange-50 transition cursor-pointer">
                  <h3 className="font-medium text-orange-600">Biology</h3>
                  <p className="text-gray-700">What's the difference between DNA and RNA?</p>
                </div>
                
                <div className="border rounded-lg p-4 hover:border-orange-300 hover:bg-orange-50 transition cursor-pointer">
                  <h3 className="font-medium text-orange-600">History</h3>
                  <p className="text-gray-700">What were the main causes and effects of the Industrial Revolution?</p>
                </div>
                
                <div className="border rounded-lg p-4 hover:border-orange-300 hover:bg-orange-50 transition cursor-pointer">
                  <h3 className="font-medium text-orange-600">Literature</h3>
                  <p className="text-gray-700">Can you analyze the main themes in George Orwell's "1984"?</p>
                </div>
                
                <div className="border rounded-lg p-4 hover:border-orange-300 hover:bg-orange-50 transition cursor-pointer">
                  <h3 className="font-medium text-orange-600">Physics</h3>
                  <p className="text-gray-700">Explain Einstein's Theory of Relativity in simple terms.</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center mb-4">
                <GraduationCap size={24} className="text-orange-400 mr-2" />
                <h2 className="text-xl font-bold">Akademix</h2>
              </div>
              <p className="text-gray-400 max-w-md">
                Your personal AI study assistant designed to help with academic questions across various subjects.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange-400">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Study Guides</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Practice Tests</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Flashcards</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Academic Papers</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange-400">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange-400">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 Akademix. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AiPanel;