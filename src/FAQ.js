import { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";

export default function FAQ() {
  const faqs = [
    {
      question: "What is NexSilver?",
      answer:
        "NexSilver is a platform that aggregates free PC/console game giveaways from multiple sources like Steam, Epic Games, Xbox, and Ubisoft.",
    },
    {
      question: "How do I claim a free game?",
      answer:
        'Click the "Claim Now" button on the game card. You’ll be redirected to the official giveaway page to complete the process.',
    },
    {
      question: "Do I need an account?",
      answer:
        "No, you don’t need an account to view or claim giveaways. Some giveaway sites may require their own login.",
    },
    {
      question: "Is it really free?",
      answer:
        "Yes, all giveaways listed on NexSilver are 100% free. Some may require a free account on the original platform.",
    },
    {
      question: "How often are giveaways updated?",
      answer:
        "We update the list daily, pulling data from multiple verified sources.",
    },
    {
      question: "Can I filter by platform?",
      answer:
        "Yes, use the filter buttons to see giveaways for Steam, Epic, Xbox, or Ubisoft.",
    },
    {
      question: "How long do giveaways last?",
      answer:
        "Each giveaway has its own end date, visible on the game card. Some are only available for a few hours.",
    },
    {
      question: "Are there any Easter Eggs?",
      answer:
        "Yes! On PC, try the Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) on your keyboard for a special surprise. 🎉 Mobile devices are not supported.",
    },
    {
      question: "I found a broken link. What should I do?",
      answer:
        "Use the Contact Form to report broken links, and we’ll fix it ASAP.",
    },
    {
      question: "Can I get notifications for new giveaways?",
      answer:
        "Notifications are coming soon! Currently, you can check the homepage daily for updates.",
    },
    {
      question: "Do you support mobile devices?",
      answer:
        "Yes, the website is fully responsive and works on both mobile and desktop.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    // Set max-height for animation
    contentRefs.current.forEach((ref, index) => {
      if (!ref) return;
      if (openIndex === index) {
        ref.style.maxHeight = ref.scrollHeight + "px";
      } else {
        ref.style.maxHeight = "0px";
      }
    });
  }, [openIndex]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto p-6 pt-24">
        <h1 className="text-3xl font-bold text-cyan-400 mb-8 text-center">
          FAQ
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[#222] rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-4 bg-[#111] hover:bg-[#1a1a1a] transition flex justify-between items-center"
              >
                <span className="text-lg font-semibold text-purple-400">
                  {faq.question}
                </span>
                <span className="text-cyan-400 font-bold text-xl">
                  {openIndex === index ? "-" : "+"}
                </span>
              </button>
              <div
                ref={(el) => (contentRefs.current[index] = el)}
                className="px-6 py-0 bg-[#181818] text-gray-300 overflow-hidden transition-max-height duration-200 ease-in-out"
                style={{ maxHeight: "0px" }}
              >
                <p className="py-4">{faq.answer}</p>
              </div>
            </div>
          ))}
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
