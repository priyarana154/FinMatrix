import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("token");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!token) return;

    const fetchChatHistory = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/ai/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.data.success) {
          setMessages(res.data.chats);
        }
      } catch (err) {
        console.error("Error loading chat history", err);
      }
    };

    fetchChatHistory();
  }, [token]);
  useEffect(() => {
    setMessages([]);
  }, [token]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 const handleSendMessage = async (e) => {
   e.preventDefault();
   if (!input.trim() || loading) return;

   const userMsg = input;
   setInput("");
   setLoading(true);

   setMessages((prev) => [...prev, { sender: "user", message: userMsg }]);

   try {
     const response = await axios.post(
       `${import.meta.env.VITE_API_URL}/api/ai/chat`,
       { message: userMsg },
       {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       },
     );

     if (response.data.success) {
       setMessages((prev) => [...prev, response.data.data]);
     }
   } catch (error) {
     console.error("Chat Error:", error);

     setMessages((prev) => [
       ...prev,
       {
         sender: "ai",
         message: "Something went wrong. Try again later.",
       },
     ]);
   } finally {
     setLoading(false);
   }
 };

  return (
    <div className="flex flex-col h-[85vh] bg-white rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto m-4">
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          🤖 FinMatrix Smart AI Advisor
        </h2>
        <p className="text-xs text-gray-500">
          Ask anything about your goals, budget, and savings.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none"
                  : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 text-gray-500 rounded-2xl rounded-tl-none px-4 py-2.5 text-sm animate-pulse">
              FinMatrix AI is thinking... 🧠
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-gray-100 bg-white rounded-b-xl flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your financial question here... (e.g., 'Should I buy Airpods?')"
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 text-sm"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AIChatbot;
