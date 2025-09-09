import { useState } from "react";
import { IoSearch } from "react-icons/io5";

function Chat() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    //  user message to UI
    const updatedMessages = [...messages, { sender: "user", text: query }];
    setMessages(updatedMessages);
    console.log(messages);

    try {
      const response = await fetch("https://ai-powered-movie-search-chat-app-in-db.onrender.com/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: query }),
      });

      const result = await response.json();
      console.log("result: ", result);


      const aiReply =
        typeof result === "string"
          ? result
          : result.message || result.error || "No response";

      // Add AI message to UI
      setMessages([...updatedMessages, { sender: "ai", text: aiReply }]);
      setQuery("");
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...updatedMessages,
        { sender: "ai", text: "Something went wrong." },
      ]);
    }
  };

  return (
    <div className="flex w-full h-screen">
      {/* AI Image (Left) */ }
      <div className="w-1/5 h-full">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1659018966834-99be9746b49e?w=500&auto=format&fit=crop&q=60"
          alt="AI"
        />
      </div>

      {/* Chat Window (Center) */}
      <div className="w-3/5 h-full flex flex-col bg-red-300 relative">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "ai" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow ${msg.sender === "ai"
                  ? "bg-blue-100 text-left"
                  : "bg-green-100 text-right"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box (Bottom) */}
        <div className="p-4  bg-red-100  hover:border-none flex items-center">
          <input
            type="text"
            className="w-full p-2  outline-none   border-r-0 bg-white border-white rounded-l-4xl"
            placeholder="Type your message..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <div onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }} className="bg-white p-2  cursor-pointer rounded-r-4xl" ><IoSearch size="25px " color="black" /> </div>
        </div>
      </div>

      {/* User Image (Right) */}
      <div className="w-1/5 h-full">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1613061174169-19c33d651be6?w=500&auto=format&fit=crop&q=60"
          alt="User"
        />
      </div>
    </div>
  );
}

export default Chat;
