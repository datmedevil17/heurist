"use client"; // Needed for Next.js App Router

import { useState } from "react";

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
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">FluxLora Image Generator</h1>

      <input
        type="text"
        placeholder="Enter Prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="border p-2 mb-3 w-80 rounded"
      />

      <input
        type="text"
        placeholder="LoRA Model Name"
        value={loraName}
        onChange={(e) => setLoraName(e.target.value)}
        className="border p-2 mb-3 w-80 rounded"
      />

      <button
        onClick={generateImage}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {imageURL && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Generated Image</h2>
          <img src={imageURL} alt="Generated" className="w-80 rounded-lg shadow-md" />
        </div>
      )}
    </div>
  );
}
