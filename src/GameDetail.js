import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import Navbar from "./Navbar";

function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePlatform, setActivePlatform] = useState("all");

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === "N/A") return "No end date";
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://gamerpower.p.rapidapi.com/api/giveaways",
          headers: {
            "X-RapidAPI-Key":
              "7fd50275c3msha8f6e30d686fd07p18f5eejsn9642446f9a66",
            "X-RapidAPI-Host": "gamerpower.p.rapidapi.com",
          },
        };
        const res = await axios.request(options);
        const found = res.data.find((g) => g.id.toString() === id);
        setGame(found || null);
      } catch (err) {
        console.error("Error fetching game:", err);
        setGame(null);
      }
      setLoading(false);
    };
    fetchGame();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!game)
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center">
        <p className="text-xl font-semibold mb-4">Game not found.</p>
        <Link to="/">
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg">
            Back Home
          </button>
        </Link>
      </div>
    );

  const expired =
    game.end_date &&
    game.end_date !== "N/A" &&
    new Date(game.end_date) < new Date();

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col pt-20">
      {/* Navbar */}
      <Navbar activePlatform={activePlatform} setPlatform={setActivePlatform} />

      <main className="flex-1 p-6 flex flex-col items-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6 text-center">
          {game.title
            .replace(/giveaway/gi, "")
            .replace(/\b(steam|epic games|xbox|ubisoft|gog|origin|pc)\b/gi, "")
            .replace(/[\[\]\(\)]/g, "")
            .replace(/\s+/g, " ")
            .trim()}
        </h1>

        <div className="flex flex-col md:flex-row gap-6 mb-6 w-full max-w-4xl">
          {/* Left: Image */}
          <img
            src={game.image}
            alt={game.title}
            className="w-full md:w-2/3 rounded-xl object-cover shadow-2xl border-2 border-cyan-500/50"
          />

          {/* Right: Actions & Tags */}
          <div className="flex flex-col justify-between w-full md:w-1/3">
            <div className="flex flex-col gap-4 my-auto">
              <a
                href={game.open_giveaway_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold rounded-xl shadow-lg transition transform hover:scale-105">
                  Claim Now
                </button>
              </a>
              <Link to="/">
                <button className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl shadow transition transform hover:scale-105">
                  Back Home
                </button>
              </Link>
            </div>

            {/* Platforms */}
            {game.platforms && (
              <div className="flex flex-wrap gap-2 mt-4">
                {(Array.isArray(game.platforms)
                  ? game.platforms
                  : [game.platforms]
                ).map((p, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-800 text-gray-200 rounded-full text-sm font-medium border border-gray-600"
                  >
                    {p}
                  </span>
                ))}
              </div>
            )}

            {/* End Date / Expired */}
            <div className="mt-3">
              {game.end_date && game.end_date !== "N/A" ? (
                expired ? (
                  <span className="px-3 py-1 bg-gray-700 text-red-400 rounded-full text-sm font-semibold border border-red-500">
                    Expired on: {formatDate(game.end_date)}
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-gray-800 text-green-400 rounded-full text-sm font-semibold border border-green-500">
                    Ends: {formatDate(game.end_date)}
                  </span>
                )
              ) : (
                <span className="px-3 py-1 bg-gray-800 text-green-400 rounded-full text-sm font-semibold border border-green-500">
                  Claim Fast
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-4xl mb-4 text-gray-300 text-lg md:text-xl text-center md:text-left leading-relaxed">
          {game.description}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-400 py-4 mt-10 flex flex-col md:flex-row justify-between items-center px-6">
        <p className="text-sm">&copy; 2025 NexSilver. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a
            href="https://www.youtube.com/@NexSilverGaming"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition"
          >
            YouTube
          </a>
          <a
            href="https://discord.gg/gBkwg732Uq"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition"
          >
            Discord
          </a>
          <a
            href="https://github.com/NexSilver"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition"
          >
            Github
          </a>
        </div>
      </footer>
    </div>
  );
}

export default GameDetail;
