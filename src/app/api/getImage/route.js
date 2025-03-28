import axios from "axios";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const body = await req.json();
    const data = {
        job_id: "heurist-sdk-job-C254845d2522",
        model_input: {
          SD: {
            prompt: "A beautiful landscape with mountains and a river",
            neg_prompt: "Avoid any signs of human presence",
            num_iterations: 20,
            width: 1024,
            height: 512,
            guidance_scale: 7.5,
            seed: -1
          }
        },
        model_id: "HeuristLogo",
        deadline: 60
      }
      const response = await axios.post("http://sequencer.heurist.xyz/submit_job",data,{
        headers:{
            "Authorization":`Bearer ${process.env.API_TOKEN}`
        }
      })
      console.log(response.data);
      return NextResponse.json({success:"true"},{status:200})
  } catch (error) {
    console.error("API Error:", error); // Logs actual error
    return Response.json({ error: error.message }, { status: 500 });
  }
}
