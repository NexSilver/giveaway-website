import Navbar from "./Navbar";
import { useState } from "react";
import emailjs from "emailjs-com";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // clear error while typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1️⃣ All fields required
    if (!form.name || !form.email || !form.message) {
      setError("All fields are required.");
      return;
    }

    // 2️⃣ Gmail-only validation
    const gmailRegex = /^[^\s@]+@gmail\.com$/i;
    if (!gmailRegex.test(form.email)) {
      setError("Please enter a valid Gmail address (e.g., user@gmail.com).");
      return;
    }

    // 3️⃣ Send email via EmailJS
    emailjs
      .send("service_so21yp5", "template_mk3jwst", form, "qPyVOeoM3NhFL9qsz")
      .then(() => {
        setForm({ name: "", email: "", message: "" });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
      })
      .catch((err) => {
        setError("Something went wrong. Try again later.");
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold text-cyan-400 mb-4">Contact Us</h1>
        <p className="text-gray-300 text-center mb-6">
          Have feedback or found a bug? Send us a quick message!
        </p>

        {submitted && (
          <p className="mb-4 text-green-500 font-medium">
            Your message has been sent!
          </p>
        )}
        {error && <p className="mb-4 text-red-500 font-medium">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-cyan-500"
          />
          <input
            type="text"
            name="email"
            placeholder="Your Gmail"
            value={form.email}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-cyan-500"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            className="px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-cyan-500 resize-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl shadow-lg hover:scale-105 transition"
          >
            Send Message
          </button>
        </form>
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
