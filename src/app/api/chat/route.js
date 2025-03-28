import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const { messages,max_tokens,temperature,model } = await request.json();
    const stream = false;
    console.log({ model,max_tokens,messages,temperature,stream })
    const response = await axios.post('https://llm-gateway.heurist.xyz/v1/chat/completions', 
      { model,max_tokens,messages,temperature,stream },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_HEURIST_API_KEY}`,
        }
      }
    );
    console.log(response.data)
    const message  = response.data?.choices[0].message?.content || "Testing Fault"
    return NextResponse.json({  message });

  } catch (error) {
    const statusCode = error.response?.status || 500;
    const message = error.response?.data?.message || 'Internal Server Error';
    console.log(error)
    return NextResponse.json(
      { message, error: error.message },
      { status: statusCode }
    );
  }
}
