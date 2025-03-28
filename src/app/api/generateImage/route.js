import { Heurist } from "heurist";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received Request Body:", body); // Debugging

    if (!body.prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    const heurist = new Heurist({
      apiKey: process.env.NEXT_PUBLIC_HEURIST_API_KEY, // Ensure this is set in `.env.local`
    });

    const response = await heurist.images.generate({
      model: "BrainDance",
      prompt: body.prompt,
    });

    console.log("Generated Image URL:", response.url); // Debugging

    return Response.json({ imageUrl: response.url });
  } catch (error) {
    console.error("API Error:", error); // Logs actual error
    return Response.json({ error: error.message }, { status: 500 });
  }
}
