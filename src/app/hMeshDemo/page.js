"use client";
import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const Page = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/fetchCrypto", { query });
      setData(response.data);
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="bg-gray-950 text-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">
          Crypto Info Finder
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter crypto name or symbol..."
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-lg font-semibold transition-all hover:bg-blue-700 disabled:bg-gray-600"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Get Information"}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center text-red-400 bg-gray-800 p-3 rounded-lg">
            Error: {error}
          </p>
        )}

        {data && (
          <div className="mt-6 bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-400 mb-3">
              Crypto Information
            </h2>
            <pre className="text-sm bg-gray-900 p-3 rounded-lg overflow-auto max-h-60">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
