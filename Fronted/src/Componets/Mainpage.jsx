import { Link } from "react-router-dom";

function Mainpage() {
    return (
        <div className="bg-amber-300 w-screen h-screen">
            {/* Wrapper */}
            <div className="flex flex-col lg:flex-row h-full">
                {/* Image Section - full height on desktop, half height on mobile */}
                <section className="h-1/2 w-full lg:h-full lg:w-1/2">
                    <img
                        src="https://images.unsplash.com/photo-1625314887424-9f190599bd56?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Movie"
                        className="w-full h-full object-cover"
                    />
                </section>

                {/* Content Section */}
                <section className="h-1/2 w-full lg:h-full lg:w-1/2 bg-amber-200 p-6 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                    <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-lg pt-2 pb-2">
                            Searching for Movies Made Simple
                        </h1>
                    </div>
                    <div className="mt-3 sm:mt-4">
                        <h2 className="text-base sm:text-lg md:text-xl lg:text-3xl font-semibold italic text-gray-700 tracking-wide drop-shadow-md">
                            "Your AI Movie Buddy—Ask. Watch. Enjoy."
                        </h2>
                    </div>

                    {/* Chat Button */}
                    <div className="mt-5 flex">
                        <Link to="/chat">
                            <button className="bg-red-500 text-white text-sm sm:text-base md:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-red-600 transition">
                                Chat with AI
                            </button>
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Mainpage;
