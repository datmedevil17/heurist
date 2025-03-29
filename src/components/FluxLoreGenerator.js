"use client"; // Needed for Next.js App Router
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function FluxLoraGenerator() {
  const [prompt, setPrompt] = useState("");
  const [loraName, setLoraName] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateImage() {
    setLoading(true);
    setError("");
    setImageURL(null);

    const response = await fetch("/api/fluxlora", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        lora_name: loraName,
        width: 1024,
        height: 1024,
        steps: 20,
        noise_seed: 123456,
        api_key: process.env.NEXT_PUBLIC_HEURIST_API_KEY, // Replace with actual API key
      }),
    });

    const data = await response.json();
    setLoading(false);

    if (data.success) {
      setImageURL(data.result);
    } else {
      setError(data.error || "Failed to generate image.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-2xl p-8 w-full max-w-md text-white"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          FluxLora Image Generator
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />

          <input
            type="text"
            placeholder="LoRA Model Name"
            value={loraName}
            onChange={(e) => setLoraName(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />

          <button
            onClick={generateImage}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-lg font-semibold transition-all hover:bg-blue-700 disabled:bg-gray-600"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Generate Image"}
          </button>
        </div>

        {error && (
          <p className="mt-4 text-center text-red-400 bg-gray-800 p-3 rounded-lg">
            Error: {error}
          </p>
        )}

        {imageURL && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 bg-gray-800 p-4 rounded-lg"
          >
            <h2 className="text-xl font-semibold text-blue-400 mb-3 text-center">
              Generated Image
            </h2>
            <img
              src={imageURL}
              alt="Generated"
              className="w-full rounded-lg shadow-lg border border-white/20"
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
