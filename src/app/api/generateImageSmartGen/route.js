import { NextResponse } from "next/server";
import Heurist from "heurist";

const heurist = new Heurist({
  apiKey: process.env.NEXT_PUBLIC_HEURIST_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      prompt,
      lora_name,
      width = 1024,
      height = 1024,
      steps = 20,
      noise_seed = 123456,
      consumer_id,
      api_key,
    } = body;

    const fluxLoraTask = new heurist.FluxLoraTask({
      workflow_id: "3",
      prompt,
      lora_name,
      width,
      height,
      steps,
      noise_seed,
      consumer_id,
      api_key,
      timeout_seconds: 300,
    });

    const response = await heurist.workflow.executeWorkflowAndWaitForResult(
      fluxLoraTask,
      600000, // 10 minutes timeout
      3000 // 3 seconds polling interval
    );

    return NextResponse.json({ success: true, result: response.result });
  } catch (error) {
    console.error("Image generation failed:", error);
    return NextResponse.json({ success: false, error: "Failed to generate image" }, { status: 500 });
  }
}