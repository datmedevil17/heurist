'use client'
import { useState } from "react";
import axios from "axios";

export default function SmartGen() {
  const [description, setDescription] = useState("A futuristic cyberpunk city");
  const [stylization, setStylization] = useState(3);
  const [detail, setDetail] = useState(3);
  const [color, setColor] = useState(3);
  const [lighting, setLighting] = useState(3);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post("/api/generateImageSmartGen", {
        description,
        stylization_level: stylization,
        detail_level: detail,
        color_level: color,
        lighting_level: lighting,
      });

      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Smart Image Generator</h1>

      <textarea
        className="p-3 border rounded w-96 bg-gray-800 text-white"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter image description..."
      />

      <div className="flex gap-4 mt-4">
        <Dropdown label="Stylization" value={stylization} setValue={setStylization} />
        <Dropdown label="Detail" value={detail} setValue={setDetail} />
      </div>

      <div className="flex gap-4 mt-4">
        <Dropdown label="Color" value={color} setValue={setColor} />
        <Dropdown label="Lighting" value={lighting} setValue={setLighting} />
      </div>

      <button
        onClick={generateImage}
        className={`mt-6 px-6 py-2 rounded-lg transition ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {loading && (
        <div className="mt-6 w-96 h-60 flex items-center justify-center bg-gray-700 rounded-lg">
          <Spinner />
        </div>
      )}

      {!loading && imageUrl && (
        <div className="mt-6">
          <img src={imageUrl} alt="Generated" className="rounded-lg w-96" />
        </div>
      )}
    </div>
  );
}

function Dropdown({ label, value, setValue }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm">{label}</label>
      <select
        className="p-2 bg-gray-800 border rounded text-white"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      >
        {[...Array(5)].map((_, i) => (
          <option key={i + 1} value={i + 1}>{`${i + 1}`}</option>
        ))}
      </select>
    </div>
  );
}

function Spinner() {
  return (
    <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
  );
}
