import { NextResponse } from "next/server";
import Heurist, { FluxLoraTask } from "heurist";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      prompt,
      lora_name,
      width = 680,
      height = 1024,
      steps = 15,
      noise_seed = 966993914913986,
      job_id_prefix = "sdk-workflow",
      timeout_seconds = 300,
      consumer_id,
      api_key,
    } = body;

    if (!prompt || !lora_name || !api_key) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }
    const heurist = new Heurist({ apiKey: `${consumer_id}#${api_key}` });

    const fluxLoraTask = new FluxLoraTask({
      workflow_id: "3",
      prompt,
      lora_name,
      width,
      height,
      steps,
      noise_seed,
      job_id_prefix,
      timeout_seconds,
    });

    const response = await heurist.workflow.executeWorkflowAndWaitForResult(
      fluxLoraTask,
      600000, 
      3000 
    );

    return NextResponse.json({ success: true, result: response.result }, { status: 200 });
  } catch (error) {
    console.error("Error processing FluxLora request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
