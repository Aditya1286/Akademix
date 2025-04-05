import React, { useState, useEffect } from "react";
import { Send, Bot } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai"; 

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isResponseScreen, setisResponseScreen] = useState(false);

  const genAI = new GoogleGenerativeAI(
        "AIzaSyB5uSgFLHoU9VDEViWMgfwrTmzRe3XfxKc"
      );
  useEffect(() => {
    setMessages([
      { type: "bot", text: "Hi there! I'm your Akademix Study Assistant. How can I help you today with your studies? Feel free to ask me any academic questions." }
    ]);
  }, []);

  const hitRequest = () => {
    if (message.trim() === "") {
      alert("You must write something!");
      return;
    }
    generateResponse(message);
  };

  const generateResponse = async (msg) => {
    if (!msg) return;

    setMessages((prevMessages) => [...prevMessages, { type: "user", text: msg }]);
    setisResponseScreen(true);
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
      setMessages((prevMessages) => [...prevMessages, { type: "bot", text: "Oops! Something went wrong." }]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-[60%] h-[80%] bg-white rounded-lg shadow-lg p-4 ">
        <h2 className="text-3xl font-semibold text-center mb-2">Ask Your Study Doubts</h2>
        <p className="text-center text-gray-600 text-md mb-4">
          Get instant help with academic questions.
        </p>

        <div className="h-[70%] overflow-y-auto border p-2 px-5  bg-gray-50 rounded">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 p-2 rounded-lg ${
                msg.type === "user"
                  ? "bg-orange-400 px-2 text-white ml-[60%] my-5 text-right"
                  : "bg-gray-200 text-gray-800 self-start mr-[35%] text-left"
              }`}
            >
              {msg.type === "bot" && <Bot className="inline-block mr-1 text-orange-500" size={16} />}
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex mt-2 ">
          <input
            type="text"
            className="flex-1 p-2 border rounded focus:outline-none"
            placeholder="Ask a question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && hitRequest()}
          />
          <button
            onClick={hitRequest}
            className="ml-2 bg-orange-400 text-white px-4 py-2 rounded flex items-center"
          >
            <Send size={16} />
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-2">
          Akademix Study Assistant is designed for academic help only.
        </p>
      </div>
    </div>
  );
};

export default Chatbot;