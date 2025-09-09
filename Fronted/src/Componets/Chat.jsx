import { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";

function Chat() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Clear Chat
  const clearChat = () => setMessages([]);

  // Back button
  const goBack = () => {
    window.location.href =
      "https://ai-powered-movie-search-chat-app-in.vercel.app/";
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    const updatedMessages = [...messages, { sender: "user", text: query }];
    setMessages(updatedMessages);

    try {
      const response = await fetch(
        "https://ai-powered-movie-search-chat-app-in-db.onrender.com/ai",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ search: query }),
        }
      );

      const result = await response.json();
      console.log("Backend Result:", result);

      let aiReply = "";

      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        if (result.route === "titleSearch") {
          aiReply =
            `🎬 Movies found with title "${result.query.title}":\n\n` +
            result.data
              .map(
                (m) =>
                  `🎬 Title: ${m.title}\n📅 Year: ${m.year}\n⭐ Rating: ${m.rating}\n📝 ${m.description}\n`
              )
              .join("\n");
        } else if (result.route === "searchRating") {
          aiReply =
            `⭐ Movies with rating ${result.query.rating} or above:\n\n` +
            result.data
              .map(
                (m) =>
                  `🎬 Title: ${m.title}\n📅 Year: ${m.year}\n⭐ Rating: ${m.rating}\n📝 ${m.description}\n`
              )
              .join("\n");
        } else if (result.route === "yearSearch") {
          aiReply =
            `📅 Movies released in ${result.query.year}:\n\n` +
            result.data
              .map(
                (m) =>
                  `🎬 Title: ${m.title}\n📅 Year: ${m.year}\n⭐ Rating: ${m.rating}\n📝 ${m.description}\n`
              )
              .join("\n");
        } else if (result.route === "genreSearch") {
          aiReply =
            `🎭 Movies in genre "${result.query.genre}":\n\n` +
            result.data
              .map(
                (m) =>
                  `🎬 Title: ${m.title}\n📅 Year: ${m.year}\n⭐ Rating: ${m.rating}\n📝 ${m.description}\n`
              )
              .join("\n");
        }
      } else {
        aiReply =
          result.message ||
          result.error ||
          "Jasmin is confused 😕. Please specify your query or give me a hint so I can do better for you.";
      }

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
    <div className="flex w-full h-screen flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between bg-red-200 p-3 shadow-md z-10">
        {/* Back Button (Left) */}
        <button
          onClick={goBack}
          className="px-3 py-1 bg-white text-red-600 rounded-lg shadow hover:bg-gray-100"
        >
          Back
        </button>

        {/* Animated Message (Desktop only) */}
        <div className="hidden md:block text-red-800 font-semibold animate-pulse text-center">
          ⏳ Please wait 30–50 sec for first time response...
        </div>

        {/* Clear Chat Button (Right) */}
        <button
          onClick={clearChat}
          className="px-3 py-1 bg-white text-red-600 rounded-lg shadow hover:bg-gray-100"
        >
          Clear
        </button>
      </div>

      {/* Main Section (Images + Chat) */}
      <div className="flex flex-1 pt-16">
        {/* AI Image (Left, hidden on mobile) */}
        <div className="hidden md:block w-1/5 h-screen">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1659018966834-99be9746b49e?w=500&auto=format&fit=crop&q=60"
            alt="AI"
          />
        </div>

        {/* Chat Window (full width on mobile) */}
        <div className="w-full md:w-3/5 h-screen flex flex-col bg-red-200 relative">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "ai" ? "justify-start" : "justify-end"
                  }`}
              >
                <div
                  className={`max-w-xs whitespace-pre-line px-4 py-2 rounded-lg shadow ${msg.sender === "ai"
                      ? "bg-blue-100 text-left"
                      : "bg-green-100 text-right"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Fixed Input */}
          <div className="p-4 bg-red-200 flex items-center">
            <input
              type="text"
              className="w-full p-2 outline-none border-r-0 bg-white rounded-l-4xl"
              placeholder="Type your message..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <div
              onClick={handleSearch}
              className="bg-white p-2 cursor-pointer rounded-r-4xl"
            >
              <IoSearch size="25px" color="black" />
            </div>
          </div>
        </div>

        {/* User Image (Right, hidden on mobile) */}
        <div className="hidden md:block w-1/5 h-screen">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1613061174169-19c33d651be6?w=500&auto=format&fit=crop&q=60"
            alt="User"
          />
        </div>
      </div>
    </div>
  );
}

export default Chat;
