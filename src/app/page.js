"use client";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) return alert("Please enter a prompt!");

    setLoading(true);
    setImageUrl("");

    const response = await fetch("/api/generateImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    setLoading(false);

    if (data.imageUrl) setImageUrl(data.imageUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <motion.div
        className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg rounded-2xl p-8 max-w-md w-full text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
          AI Image Generator
        </h1>

        <ConnectButton />

        <motion.input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe an image..."
          className="w-full p-3 mt-6 rounded-lg text-black bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          whileFocus={{ scale: 1.05 }}
        />

        <motion.button
          onClick={generateImage}
          className={`w-full mt-4 cursor-pointer px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 shadow-lg"
          }`}
          disabled={loading}
          
          whileTap={{ scale: 0.95 }}
        >
          {loading ? "Generating..." : "Generate Image"}
        </motion.button>

        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-12 h-12 mt-4 border-4 border-blue-500 border-t-transparent rounded-full"
          />
        )}

        {imageUrl && (
          <motion.img
            src={imageUrl}
            alt="Generated AI Image"
            className="mt-6 w-full rounded-lg shadow-xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.div>
    </div>
  );
}
