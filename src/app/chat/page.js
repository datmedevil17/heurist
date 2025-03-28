"use client";
import { useState } from "react";
import Image from "next/image";

const AVAILABLE_MODELS = [
  "hermes-3-llama3.1-8b",
  "meta-llama/llama-3.3-70b-instruct",
  "mistralai/mistral-7b-instruct",
  "mistralai/mixtral-8x22b-instruct",
  "mistralai/mixtral-8x7b-instruct",
  "nvidia/llama-3.1-nemotron-70b-instruct",
  "qwen/qwen-2.5-coder-32b-instruct"
];

const AssistantAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
    AI
  </div>
);

const UserAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
    U
  </div>
);

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful assistant." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [temperature, setTemperature] = useState(0.7);
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: newMessages,
          max_tokens: parseInt(maxTokens),
          temperature: parseFloat(temperature),
          model: selectedModel
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMessages([...newMessages, { role: "assistant", content: data?.message || "" }]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-400">AI Chat Assistant</h1>
        
        {/* Controls Section */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-3">
              <label className="block text-sm font-medium text-blue-400 mb-2">
                Select Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                disabled={loading}
              >
                {AVAILABLE_MODELS.map((model) => (
                  <option key={model} value={model} className="bg-gray-700">
                    {model}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-400 mb-2">
                Max Tokens
              </label>
              <input
                type="number"
                value={maxTokens}
                onChange={(e) => setMaxTokens(e.target.value)}
                min="1"
                max="4096"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-400 mb-2">
                Temperature
              </label>
              <input
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                min="0"
                max="2"
                step="0.1"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl mb-6 min-h-[400px] max-h-[600px] overflow-y-auto">
          {messages.slice(1).map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex items-start space-x-3 ${
                msg.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"
              }`}
            >
              {msg.role === "user" ? <UserAvatar /> : <AssistantAvatar />}
              <div
                className={`p-4 rounded-lg flex-1 ${
                  msg.role === "user"
                    ? "bg-blue-900 text-white max-w-[80%]"
                    : "bg-gray-700 text-white max-w-[80%]"
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`text-sm font-medium ${
                    msg.role === "user" ? "text-blue-400" : "text-green-400"
                  }`}>
                    {msg.role === "user" ? "You" : "Assistant"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-gray-100 whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center space-x-2 p-4">
              <AssistantAvatar />
              <div className="animate-pulse flex space-x-2">
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-xl">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 p-4 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200 placeholder-gray-400"
              disabled={loading}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            />
            <button 
              onClick={handleSend} 
              disabled={loading}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 disabled:bg-blue-800 disabled:opacity-50 shadow-lg"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}