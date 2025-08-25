import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function Mainpage() {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        // GSAP Text Entrance Effect
        gsap.fromTo(
            titleRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
        );

        gsap.fromTo(
            subtitleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: "power4.out" }
        );

        // Floating Button Effect
        gsap.to(buttonRef.current, {
            y: -10,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            duration: 1.5,
        });
    }, []);

    return (
        <div className="bg-amber-300 w-screen h-screen">
            {/* Main content wrapper */}
            <div className="flex items-center justify-center p-10 h-full">
                {/* Left Section */}
                <section className="flex flex-col w-1/2 bg-amber-200 p-6 h-full rounded-2xl shadow-2xl overflow-hidden">
                    <div className="flex flex-col h-3/4 overflow-hidden">
                        <motion.div
                            ref={titleRef}
                            initial={{ opacity: 0, x: -1 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-2/3 flex items-center"
                        >
                            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-lg leading-tight break-words">
                                Searching for Movies Made Simple
                            </h1>
                        </motion.div>

                        <motion.div
                            ref={subtitleRef}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                            className="h-1/3 flex items-center"
                        >
                            <h2 className="text-2xl md:text-3xl font-semibold italic text-gray-700 tracking-wide drop-shadow-md leading-snug">
                                "Your AI Movie Buddy—Ask. Watch. Enjoy."
                            </h2>
                        </motion.div>
                    </div>

                    <div className="h-1/4 flex items-center">
                        <Link to={"/chat"}>
                            <motion.button
                                ref={buttonRef}
                                whileHover={{
                                    scale: 1.1,
                                    backgroundColor: "#dc2626",
                                    boxShadow: "0px 0px 15px rgba(255,0,0,0.6)",
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-red-500 text-white px-6 py-3 rounded-lg transition"
                            >
                                Chat with AI
                            </motion.button>
                        </Link>
                    </div>
                </section>

                {/* Right Section - Image */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-1/2 h-full"
                >
                    <img
                        src="https://images.unsplash.com/photo-1625314887424-9f190599bd56?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0"
                        alt="Movie"
                        className="w-full h-full object-cover block rounded-xl shadow-xl"
                    />
                </motion.section>
            </div>
        </div>
    );
}

export default Mainpage;
