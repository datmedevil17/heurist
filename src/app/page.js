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

    setLoading(true); // Start loading
    setImageUrl(""); // Clear previous image

    const response = await fetch("/api/generateImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    setLoading(false); // Stop loading

    if (data.imageUrl) setImageUrl(data.imageUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome to My dApp</h1>
      <ConnectButton />

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt for AI image..."
        className="w-full max-w-md p-3 my-4 text-black rounded-lg"
      />

      <button
        onClick={generateImage}
        className={`px-6 py-2 text-lg font-semibold rounded-lg ${
          loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

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
          className="mt-6 w-96 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </div>
  );
}
