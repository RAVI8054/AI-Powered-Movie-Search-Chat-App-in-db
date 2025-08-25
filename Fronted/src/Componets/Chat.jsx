import { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";

function Chat() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    const updatedMessages = [...messages, { sender: "user", text: query }];
    setMessages(updatedMessages);

    try {
      const response = await fetch("http://localhost:8080/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search: query }),
      });

      const result = await response.json();
      console.log("result:", result);

      if (Array.isArray(result)) {
        // If first element has "message" → show normal message + movie details
        if (result[0]?.message) {
          setMessages([
            ...updatedMessages,
            { sender: "ai", type: "text", text: result[0].message },
            { sender: "ai", type: "movies", movies: result.slice(1) },
          ]);
        } else {
          setMessages([
            ...updatedMessages,
            { sender: "ai", type: "movies", movies: result },
          ]);
        }
      } else if (result.message) {
        setMessages([...updatedMessages, { sender: "ai", type: "text", text: result.message }]);
      } else if (result.error) {
        setMessages([...updatedMessages, { sender: "ai", type: "text", text: `❌ ${result.error}` }]);
      } else {
        setMessages([...updatedMessages, { sender: "ai", type: "text", text: "⚠️ No valid response." }]);
      }

      setQuery("");
    } catch (error) {
      console.error("Error:", error);
      setMessages([...updatedMessages, { sender: "ai", type: "text", text: "⚠️ Something went wrong." }]);
    }
  };

  return (
    <div className="flex w-full h-screen">
      {/* Left Image (hidden on small screens) */}
      <div className="hidden md:block w-1/5 h-full">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1659018966834-99be9746b49e?w=500&auto=format&fit=crop&q=60"
          alt="AI"
        />
      </div>

      {/* Chat Window */}
      <div className="flex-1 h-full flex flex-col bg-red-300 relative">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "ai" ? "justify-start" : "justify-end"}`}
            >
              {/* Case 1: Movie Details */}
              {msg.sender === "ai" && msg.type === "movies" ? (
                <div className="grid gap-4">
                  {msg.movies.map((movie, i) => (
                    <div key={i} className="bg-white shadow-md rounded-lg p-4 border">
                      <h3 className="font-bold text-lg text-gray-800">{movie.title}</h3>
                      <p className="text-gray-600">{movie.description}</p>
                      <p className="text-sm mt-1">
                        <span className="font-semibold">📅 Year:</span> {movie.year}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">⭐ Rating:</span> {movie.rating}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                // Case 2: Normal Text
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg shadow ${msg.sender === "ai"
                      ? "bg-blue-100 text-left"
                      : "bg-green-100 text-right"
                    }`}
                >
                  {msg.text}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-red-100 flex items-center">
          <input
            type="text"
            className="w-full p-2 outline-none bg-white rounded-l-4xl"
            placeholder="Type your message..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <div
            onClick={handleSearch}
            className="bg-white p-2 cursor-pointer rounded-r-4xl"
          >
            <IoSearch size="25px" color="black" />
          </div>
        </div>
      </div>

      {/* Right Image (hidden on small screens) */}
      <div className="hidden md:block w-1/5 h-full">
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
