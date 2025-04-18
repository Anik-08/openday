'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Badge images array
const badgeImages = [
  "/badges/green-badge.png",
  "/badges/blue-badge.png",
  "/badges/green-badge.png",
  "/badges/yellow-badge.png",
  "/badges/green-badge.png",
  "/badges/red-badge.png",
  "/badges/pink-badge.png",
  "/badges/cyan-badge.png",
];

// Define the form data structure
type FormDataType = {
  email: string;
  personality: string;
  superpower: string;
  teamSpirit: string;
  snack: string;
  meme: string;
  mascot: string;
  song: string;
  deadlineReaction: string;
  badge: string;
};

const AboutYouPage = () => {
  const [formData, setFormData] = useState<FormDataType>({
    email: '',
    personality: '',
    superpower: '',
    teamSpirit: '',
    snack: '',
    meme: '',
    mascot: '',
    song: '',
    deadlineReaction: '',
    badge: '',
  });
  
  const [badge, setBadge] = useState<string | null>(null);
  const [submissionMessage, setSubmissionMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const randomBadge = badgeImages[Math.floor(Math.random() * badgeImages.length)];
    const badgeName = randomBadge.split("/").pop()?.split("-")[0] || "unknown";

    const updatedFormData = {
      ...formData,
      badge: badgeName,
    };

    try {
      const res = await fetch("/api/about-you", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (res.ok) {
        setBadge(randomBadge);
        setSubmissionMessage({ text: "Form submitted successfully. You're awesome!", success: true });
        setFormData({
          email: '',
          personality: '',
          superpower: '',
          teamSpirit: '',
          snack: '',
          meme: '',
          mascot: '',
          song: '',
          deadlineReaction: '',
          badge: '',
        });
      } else {
        setSubmissionMessage({ text: "Failed to submit. Please try again.", success: false });
        setBadge(null);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionMessage({ text: "Something went wrong. Please try again.", success: false });
      setBadge(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDEAE2] px-4 py-10 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 mt-10"
        >
          <h1 className="text-3xl font-bold text-[#67B044] font-['BS'] p-2 leading-tight sm:leading-snug">
            Tell Us About Your Vibe!
          </h1>
          <p className="text-gray-600 mt-2 font-['OSK'] tracking-wider">
            Let&apos;s get to know you a little more 😄
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-[#9EE666]/30 shadow-sm">
          {/* Email */}
          <div>
            <label className="block text-lg font-medium text-gray-700 font-['OSK'] tracking-wide mb-1">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required className="w-full border rounded-lg px-4 py-2 focus:ring-[#67B044]" />
          </div>

          {/* Personality */}
          <div>
            <label className="block text-lg font-medium text-gray-700 font-['OSK'] tracking-wide mb-1">What best describes your personality?</label>
            <select name="personality" value={formData.personality} onChange={handleChange} required className="w-full border rounded-lg px-4 py-2 focus:ring-[#67B044]">
              <option value="">Select an option</option>
              <option value="rage">🔥 Rage Monster</option>
              <option value="patience">🧘 Patience Guru</option>
              <option value="chaotic">🎉 Chaotic Good</option>
              <option value="chill">😎 Cool & Chill</option>
            </select>
          </div>

          {/* Superpower */}
          <div><label className="block text-lg font-medium text-gray-700 font-['OSK'] tracking-wide mb-1">If you had a superpower, what would it be?</label>
            <input type="text" name="superpower" value={formData.superpower} onChange={handleChange} required placeholder="Invisibility, teleportation, sarcasm..." className="w-full border rounded-lg px-4 py-2 focus:ring-[#67B044]" />
          </div>

          {/* Team Spirit */}
          <div><label className="block text-lg font-medium text-gray-700 font-['OSK'] tracking-wide mb-1">Are you a team player or lone wolf?</label>
            <select name="teamSpirit" value={formData.teamSpirit} onChange={handleChange} required className="w-full border rounded-lg px-4 py-2 focus:ring-[#67B044]">
              <option value="">Pick one</option>
              <option value="team">🤝 Team Player</option>
              <option value="solo">🐺 Lone Wolf</option>
              <option value="depends">🤷 Depends on the day</option>
            </select>
          </div>

          {/* Snack */}
          <div><label className="block text-lg font-medium text-gray-700 font-['OSK'] tracking-wide mb-1">What&apos;s your go-to snack during a binge-watch?</label>
            <input type="text" name="snack" value={formData.snack} onChange={handleChange} required placeholder="Popcorn? Maggi? Pizza? Air?" className="w-full border rounded-lg px-4 py-2 focus:ring-[#67B044]" />
          </div>

          {/* Meme */}
          <div><label className="block text-lg font-medium text-gray-700 font-['OSK'] tracking-wide mb-1">If you were a meme, which one would you be?</label>
            <input type="text" name="meme" value={formData.meme} onChange={handleChange} required placeholder="Grumpy cat? Distracted boyfriend?" className="w-full border rounded-lg px-4 py-2 focus:ring-[#67B044]" />
          </div>

          {/* Mascot */}
          <div><label className="block text-lg font-medium text-gray-700 font-['OSK'] tracking-wide mb-1">Choose a mascot for your inner self:</label>
            <input type="text" name="mascot" value={formData.mascot} onChange={handleChange} required placeholder="Sloth, dragon, potato..." className="w-full border rounded-lg px-4 py-2 focus:ring-[#67B044]" />
          </div>

          {/* Song */}
          <div><label className="block text-lg font-medium text-gray-700 font-['OSK'] tracking-wide mb-1">What song describes your current vibe?</label>
            <input type="text" name="song" value={formData.song} onChange={handleChange} required placeholder="Feeling like a rockstar?" className="w-full border rounded-lg px-4 py-2 focus:ring-[#67B044]" />
          </div>

          {/* Deadline Reaction */}
          <div><label className="block text-lg font-medium text-gray-700 font-['OSK'] tracking-wide mb-1">How do you react when you hear the word &quot;deadline&quot;?</label>
            <input type="text" name="deadlineReaction" value={formData.deadlineReaction} onChange={handleChange} required placeholder="Fight, flight, or nap?" className="w-full border rounded-lg px-4 py-2 focus:ring-[#67B044]" />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#67B044] text-white font-['OSK'] tracking-wider px-8 py-3 rounded-full text-lg shadow-md hover:bg-[#67B044]/90 transition"
            >
              Submit Answers
            </motion.button>
          </div>
        </form>
      </div>

      {/* Overlay Badge */}
      {badge && (
        <div
          className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center text-center cursor-pointer"
          onClick={() => setBadge(null)}
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white text-2xl md:text-3xl font-['OSK'] font-bold mb-6 tracking-wide"
          >
            You got a{" "}
            <span className="capitalize underline decoration-[#9EE666] underline-offset-4">
              {badge.split("/").pop()?.split("-")[0]}
            </span>{" "}
            color badge!
          </motion.h2>

          <motion.img
            src={badge}
            alt="You earned a badge!"
            className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] object-contain drop-shadow-2xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />

          {submissionMessage?.success && (
            <p className="mt-6 text-white text-xl font-['OSK'] tracking-wide px-4">
              {submissionMessage.text}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AboutYouPage;
