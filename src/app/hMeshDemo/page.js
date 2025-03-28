"use client";
import React, { useState } from "react";
import axios from "axios";

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
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your crypto query..."
            className="p-2 border rounded-md w-full"
            required
          />
          <button 
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "Loading..." : "Get Information"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-500">Error: {error}</p>}
      {data && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Crypto Information</h1>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Page;
