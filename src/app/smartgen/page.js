'use client';
import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function SmartGen() {
  const [description, setDescription] = useState('A futuristic cyberpunk city');
  const [stylization, setStylization] = useState(3);
  const [detail, setDetail] = useState(3);
  const [color, setColor] = useState(3);
  const [lighting, setLighting] = useState(3);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/generateImageSmartGen', {
        prompt: description,
        lora_name: 'gecko',
        stylization_level: stylization,
        detail_level: detail,
        color_level: color,
        lighting_level: lighting,
      });
      setImageUrl(response.data.result);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }} 
      className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-900 to-black text-white"
    >
      <div className="flex gap-12 w-full max-w-5xl">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">
            Smart Image Generator
          </h1>
          <textarea
            className="p-4 border border-gray-700 rounded-xl w-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 shadow-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter image description..."
          />
          <div className="flex gap-4 mt-6">
            <Dropdown label="Stylization" value={stylization} setValue={setStylization} />
            <Dropdown label="Detail" value={detail} setValue={setDetail} />
          </div>
          <div className="flex gap-4 mt-6">
            <Dropdown label="Color" value={color} setValue={setColor} />
            <Dropdown label="Lighting" value={lighting} setValue={setLighting} />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateImage}
            className={`mt-8 px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300 w-full ${
              loading
                ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Image'}
          </motion.button>
        </div>

        <div className="flex-1 flex items-center justify-center">
          {loading ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-96 h-60 flex items-center justify-center bg-gray-800 rounded-2xl shadow-lg"
            >
              <Spinner />
            </motion.div>
          ) : (
            imageUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md"
              >
                <img
                  src={imageUrl}
                  alt="Generated"
                  className="rounded-2xl w-full shadow-xl"
                />
              </motion.div>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Dropdown({ label, value, setValue }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm text-gray-300 mb-2">{label}</label>
      <select
        className="p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 shadow-md"
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
    <motion.div
      className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"
      animate={{ rotate: 360 }}
      transition={{ loop: Infinity, duration: 1 }}
    ></motion.div>
  );
}
