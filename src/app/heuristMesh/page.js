"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/Card";
import { Loader } from "lucide-react";

const Page = () => {
  const [metadata, setMetadata] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeAgent, setActiveAgent] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch("https://mesh.heurist.ai/mesh_agents_metadata.json");
        if (!response.ok) throw new Error("Failed to fetch metadata");
        const data = await response.json();
        setMetadata(data.agents || {});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActiveAgent(null);
    };

    document.body.style.overflow = activeAgent ? "hidden" : "auto";

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeAgent]);

  useOutsideClick(ref, () => setActiveAgent(null));

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
            layoutId={`card-${agentName}-${id}`}
            onClick={() => setActiveAgent(agentName)}
            className="cursor-pointer"
          >
            <Card className="bg-white/10 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all border border-white/20 rounded-xl p-5 h-full">
              <CardHeader>
                <motion.div layoutId={`title-${agentName}-${id}`}>
                  <CardTitle className="text-lg font-semibold text-blue-400">
                    {agentName}
                  </CardTitle>
                </motion.div>
              </CardHeader>
              <CardContent>
                <motion.p layoutId={`description-${agentName}-${id}`} className="text-sm text-gray-300 line-clamp-3">
                  {agentData.metadata?.description || "No description available"}
                </motion.p>
                <motion.div layoutId={`button-${agentName}-${id}`} className="mt-4">
                  <div className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100/10 hover:bg-blue-500/50 transition-colors text-white">
                    View Details
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeAgent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            <div className="fixed inset-0 grid place-items-center z-[60] p-4">
              <motion.div
                layoutId={`card-${activeAgent}-${id}`}
                ref={ref}
                className="w-full max-w-3xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl overflow-hidden"
              >
                <Card className="bg-transparent">
                  <CardHeader>
                    <motion.div layoutId={`title-${activeAgent}-${id}`}>
                      <CardTitle className="text-2xl font-bold text-blue-400">
                        {activeAgent}
                      </CardTitle>
                    </motion.div>
                  </CardHeader>

                  {/* Scrollable Container */}
                  <div className="max-h-[70vh] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
                    <CardContent className="space-y-6">
                      <motion.div layoutId={`description-${activeAgent}-${id}`}>
                        <p className="text-gray-300 mb-6">
                          {metadata[activeAgent]?.metadata?.description || "No description available"}
                        </p>
                      </motion.div>

                      <div className="grid grid-cols-2 gap-4 text-gray-300">
                        <div>
                          <p><strong>Version:</strong> {metadata[activeAgent]?.metadata?.version || "N/A"}</p>
                          <p><strong>Author:</strong> {metadata[activeAgent]?.metadata?.author || "Unknown"}</p>
                          <p><strong>Author Address:</strong> {metadata[activeAgent]?.metadata?.author_address || "N/A"}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-blue-400 mb-4">Tools</h3>
                        <ul className="space-y-4">
                          {metadata[activeAgent]?.tools?.length ? (
                            metadata[activeAgent].tools.map((tool, index) => (
                              <li key={index} className="bg-gray-800/60 p-4 rounded-lg">
                                <p><strong>Type:</strong> {tool.type || "N/A"}</p>
                                <p><strong>Name:</strong> {tool.function?.name || "N/A"}</p>
                                <p><strong>Description:</strong> {tool.function?.description || "None"}</p>
                                {tool.function?.parameters && (
                                  <div className="mt-2">
                                    <p className="font-medium">Parameters:</p>
                                    <pre className="text-xs bg-black/30 p-2 rounded overflow-x-auto">
                                      {JSON.stringify(tool.function.parameters, null, 2)}
                                    </pre>
                                  </div>
                                )}
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500">No tools available</li>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                  </div>

                  <motion.div layoutId={`button-${activeAgent}-${id}`} className="mt-4 p-4">
                    <button
                      onClick={() => setActiveAgent(null)}
                      className="w-full py-3 rounded-full bg-blue-500/80 hover:bg-blue-500 transition-colors text-white font-semibold"
                    >
                      Close Details
                    </button>
                  </motion.div>
                </Card>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;
