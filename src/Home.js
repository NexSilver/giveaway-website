import { useEffect, useState } from "react";
import { FaSteam, FaXbox, FaArrowUp } from "react-icons/fa";
import { SiEpicgames, SiUbisoft } from "react-icons/si";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import LoadingSpinner from "./LoadingSpinner";

gsap.registerPlugin(ScrollToPlugin);

function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [platform, setPlatform] = useState("all");
  const [search, setSearch] = useState("");
  const [displayCount, setDisplayCount] = useState(12);
  const [showTopBtn, setShowTopBtn] = useState(false);

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

  const filters = [
    {
      id: "all",
      label: "All Platforms",
      icon: null,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "steam",
      label: "Steam",
      icon: <FaSteam />,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "epic-games-store",
      label: "Epic",
      icon: <SiEpicgames />,
      color: "from-gray-700 to-gray-800",
    },
    {
      id: "xbox-one",
      label: "Xbox",
      icon: <FaXbox />,
      color: "from-green-600 to-green-700",
    },
    {
      id: "ubisoft",
      label: "Ubisoft",
      icon: <SiUbisoft />,
      color: "from-cyan-400 to-blue-500",
    },
  ];

  const platformMatches = (gamePlatforms, filterId) => {
    if (!gamePlatforms) return false;
    const platformsArray = Array.isArray(gamePlatforms)
      ? gamePlatforms
      : [gamePlatforms];
    const map = {
      steam: ["steam"],
      "epic-games-store": ["epic"],
      "xbox-one": ["xbox"],
      ubisoft: ["ubisoft"],
    };
    const keywords = map[filterId] || [];
    return platformsArray.some((p) =>
      keywords.some((k) => p.toLowerCase().includes(k))
    );
  };

  const isNew = (date) => {
    if (!date || date === "N/A") return false;
    return (new Date() - new Date(date)) / (1000 * 60 * 60) <= 48;
  };

  useEffect(() => {
    const fetchGiveaways = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://gamerpower.p.rapidapi.com/api/giveaways",
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "7fd50275c3msha8f6e30d686fd07p18f5eejsn9642446f9a66",
              "X-RapidAPI-Host": "gamerpower.p.rapidapi.com",
            },
          }
        );
        const data = await res.json();
        setGames(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchGiveaways();
  }, []);

  // Back-to-top button
  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    gsap.to(window, { duration: 0.6, scrollTo: 0, ease: "power2.out" });
  };

  // Tilt effect
  useEffect(() => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
      });
    });
    return () => cards.forEach((card) => (card.style.transform = ""));
  }, [games]);

  const filteredGames = Array.isArray(games)
    ? games
        .filter((g) => g.title.toLowerCase().includes(search.toLowerCase()))
        .filter(
          (g) => platform === "all" || platformMatches(g.platforms, platform)
        )
        .slice(0, displayCount)
    : [];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col pt-20">
      <Navbar />

      {/* Search */}
      <div className="flex justify-center my-6">
        <input
          type="text"
          placeholder="Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-gray-700 text-white focus:outline-none focus:border-cyan-500 w-80"
        />
      </div>

      {/* Filters */}
      <div className="flex justify-center flex-wrap gap-3 mb-10 px-4">
        {filters.map((f) => (
          <button
            key={f.id}
            className={`flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-medium capitalize transition ${
              platform === f.id
                ? `bg-gradient-to-r ${f.color} text-white border-transparent`
                : "bg-[#1a1a1a] border-[#333] text-gray-300 hover:text-white hover:border-white"
            }`}
            onClick={() => {
              setPlatform(f.id);
              setDisplayCount(12);
            }}
          >
            {f.icon && <span className="text-lg">{f.icon}</span>}
            {f.label}
          </button>
        ))}
      </div>

      {/* Game Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-6 flex-1">
        {loading && <LoadingSpinner />}
        {!loading && filteredGames.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No giveaways right now.
          </p>
        )}
        {!loading &&
          filteredGames.map((g) => {
            const expired =
              g.end_date &&
              g.end_date !== "N/A" &&
              new Date(g.end_date) < new Date();
            return (
              <div
                key={g.id}
                className="card bg-[#181818] rounded-xl border border-[#222] overflow-hidden hover:scale-[1.02] hover:shadow-lg transition-transform duration-200 flex flex-col"
              >
                <img
                  src={g.image}
                  alt={g.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold">
                      {g.title
                        .replace(/giveaway/gi, "")
                        .replace(
                          /\b(steam|epic games|xbox|ubisoft|gog|origin|pc)\b/gi,
                          ""
                        )
                        .replace(/[\[\]\(\)]/g, "")
                        .trim()}
                    </h2>
                    {isNew(g.published_date) && (
                      <span className="text-xs bg-cyan-500 text-black px-2 py-0.5 rounded-full">
                        NEW
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-1">
                    {g.description}
                  </p>

                  {g.platforms && (
                    <span className="text-xs text-gray-400 mb-1">
                      {Array.isArray(g.platforms)
                        ? g.platforms.join(", ")
                        : g.platforms}
                    </span>
                  )}

                  <span className="text-xs text-gray-400 mb-2">
                    {g.end_date && g.end_date !== "N/A"
                      ? expired
                        ? `Expired on: ${formatDate(g.end_date)}`
                        : `Ends: ${formatDate(g.end_date)}`
                      : "Claim Fast"}
                  </span>

                  {expired ? (
                    <button className="w-full bg-gray-800 text-gray-500 py-2 rounded-lg font-medium cursor-not-allowed mt-auto">
                      Expired
                    </button>
                  ) : (
                    <Link to={`/game/${g.id}`}>
                      <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white py-2 rounded-lg font-medium transition">
                        Claim Now
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {/* Load More */}
      {!loading &&
        filteredGames.length <
          games.filter((g) =>
            g.title.toLowerCase().includes(search.toLowerCase())
          ).length && (
          <div className="flex justify-center mb-10">
            <button
              onClick={() => setDisplayCount((prev) => prev + 12)}
              className="px-6 py-2 bg-cyan-500 hover:bg-purple-500 rounded-lg text-white font-medium transition"
            >
              Load More
            </button>
          </div>
        )}

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

      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="back-to-top fixed bottom-6 right-6 bg-gradient-to-r from-cyan-500 to-purple-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
        >
          <FaArrowUp className="text-lg" />
        </button>
      )}
    </div>
  );
}

export default Home;
