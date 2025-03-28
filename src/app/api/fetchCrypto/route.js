import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    const response = await axios.post(
      "https://sequencer-v2.heurist.xyz/mesh_request",
      {
        api_key: process.env.NEXT_PUBLIC_HEURIST_API_KEY,
        agent_id: "CoinGeckoTokenInfoAgent",
        input: { query, raw_data_only: false },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
