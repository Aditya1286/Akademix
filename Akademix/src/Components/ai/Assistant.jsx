import React, { useState, useEffect } from "react";
import { Send, Bot, MessageCircle, X, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai"; 
import { useNavigate } from "react-router-dom";

const ProfessionalChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const navigate = useNavigate()
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
      const model =  genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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
    //   setMessages((prevMessages) => [...prevMessages, { type: "bot", text: "Oops! Something went wrong. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);
  
  return (
    <>
      {/* Fixed chat button in the corner */}
      {!isOpen && (
        <div 
          className="fixed bottom-6 right-6 z-50 cursor-pointer transition-all hover:scale-105"
          onClick={toggleChatbot}
        >
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center">
            <MessageCircle size={24} />
          </div>
        </div>
      )}
      
      {/* Popup chatbot */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-40 shadow-2xl transition-all">
          <div className={`w-80 md:w-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden transition-all duration-300 ${isMinimized ? 'h-16' : 'h-96 md:h-[32rem]'}`}>
            {/* Header */}
            <div className="bg-gradient-to-r w-full  from-orange-400 to-orange-500 text-white p-3 flex justify-between items-center">
              <div className="flex items-center justify-around ">
                <Bot className="mr-2" size={20} />
                <h2 className="font-semibold">Akademix Study Assistant</h2> <button className="w-[30%] h-[20%] bg-white font-bold text-orange-400 rounded-full" onClick={()=> navigate("/ai")} ><p>Expand</p></button>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={toggleMinimize}
                  className="hover:bg-orange-600 p-1 rounded transition"
                  aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
                >
                  {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <button 
                  onClick={toggleChatbot}
                  className="hover:bg-orange-600 p-1 rounded transition"
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            
            {!isMinimized && (
              <>
                {/* Messages container */}
                <div 
                  id="messages-container"
                  className="flex-grow overflow-y-auto p-3 bg-gray-50"
                >
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`my-2 p-2 rounded-lg max-w-[80%] shadow-sm ${
                        msg.type === "user"
                          ? "bg-orange-400 text-white ml-auto"
                          : "bg-white border border-gray-200 text-gray-800"
                      }`}
                    >
                      {msg.type === "bot" && <Bot className="inline-block mr-1 text-orange-500" size={14} />}
                      <span className="whitespace-pre-wrap">{msg.text}</span>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="bg-white border border-gray-200 text-gray-800 p-2 rounded-lg max-w-[80%] shadow-sm my-2">
                      <Bot className="inline-block mr-1 text-orange-500" size={14} />
                      <span className="animate-pulse">Typing...</span>
                    </div>
                  )}
                </div>
                
                {/* Clear history button */}
                <div className="px-3 py-1 border-t border-gray-200 flex justify-end">
                  <button 
                    onClick={clearHistory}
                    className="text-xs text-gray-500 flex items-center hover:text-red-500 transition"
                  >
                    <Trash2 size={12} className="mr-1" /> Clear history
                  </button>
                </div>
                
                {/* Input area */}
                <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex">
                  <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 text-sm"
                    placeholder="Ask a question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    className={`bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-r-lg flex items-center transition ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-orange-500 hover:to-orange-600'
                    }`}
                    disabled={isLoading}
                  >
                    <Send size={16} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfessionalChatbot;