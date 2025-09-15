import { Link } from "react-router-dom";
import { FaYoutube, FaDiscord, FaGithub } from "react-icons/fa";
import Navbar from "./Navbar";

function About() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.7)] mb-6">
          About NexSilver
        </h1>

        <p className="max-w-2xl text-gray-300 text-lg leading-relaxed mb-8">
          Hey! I’m <span className="text-cyan-400 font-bold">NexSilver</span> —
          a passionate gamer and developer bringing you the latest gaming
          giveaways all in one place. This site is built for gamers who love
          free stuff (because who doesn’t?). 🕹️💜
        </p>

        {/* Links Section */}
        <div className="flex gap-6">
          <a
            href="https://www.youtube.com/@NexSilverGaming"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl hover:scale-105 transition transform shadow-lg"
          >
            <FaYoutube /> YouTube
          </a>

          <a
            href="https://discord.gg/gBkwg732Uq"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl hover:scale-105 transition transform shadow-lg"
          >
            <FaDiscord /> Discord
          </a>

          <a
            href="https://github.com/NexSilver"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl hover:scale-105 transition transform shadow-lg"
          >
            <FaGithub /> GitHub
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-400 py-4 text-center text-sm border-t border-gray-800">
        &copy; 2025 NexSilver. All rights reserved. | Made with 💜💙 for gamers
      </footer>
    </div>
  );
}

export default About;
