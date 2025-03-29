"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card,CardContent,CardTitle,CardHeader } from "../../components/ui/Card";
import { Loader } from "lucide-react";

const Page = () => {
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch("https://mesh.heurist.ai/mesh_agents_metadata.json");
        if (!response.ok) {
          throw new Error("Failed to fetch metadata");
        }
        const data = await response.json();
        setMetadata(data.agents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-white">
        <Loader className="animate-spin w-8 h-8 mr-2" /> Loading...
      </div>
    );
  
  if (error)
    return <div className="text-center text-red-500 font-medium mt-10">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(metadata).map(([agentName, agentData]) => (
          <motion.div
            key={agentName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all border border-white/20 rounded-xl p-5">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-400">{agentName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-2">
                  <strong>Description:</strong> {agentData.metadata?.description || "No description available"}
                </p>
                <p className="text-sm text-gray-300 mb-2">
                  <strong>Version:</strong> {agentData.metadata?.version || "N/A"}
                </p>
                <p className="text-sm text-gray-300 mb-2">
                  <strong>Author:</strong> {agentData.metadata?.author || "Unknown"}
                </p>
                <p className="text-sm text-gray-300 mb-4">
                  <strong>Author Address:</strong> {agentData.metadata?.author_address || "N/A"}
                </p>
                <h3 className="font-medium text-blue-400 mb-2">Tools:</h3>
                <ul className="list-none space-y-3">
                  {agentData.tools?.length ? (
                    agentData.tools.map((tool, index) => (
                      <li key={index} className="bg-gray-800/60 p-3 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-300">
                          <strong>Type:</strong> {tool.type || "N/A"}
                        </p>
                        <p className="text-sm text-gray-300">
                          <strong>Name:</strong> {tool.function?.name || "N/A"}
                        </p>
                        <p className="text-sm text-gray-300">
                          <strong>Description:</strong> {tool.function?.description || "No description available"}
                        </p>
                        <p className="text-sm text-gray-300">
                          <strong>Parameters:</strong> {tool.function?.parameters ? JSON.stringify(tool.function.parameters, null, 2) : "None"}
                        </p>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No tools available</li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Page;
