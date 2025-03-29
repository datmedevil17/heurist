import { NextResponse } from 'next/server'
import Heurist from 'heurist'

const heurist = new Heurist({
  apiKey: process.env.NEXT_PUBLIC_HEURIST_API_KEY,
})

export async function POST(req) {
  try {
    const body = await req.json()
    const {
      description,
      image_model = 'FLUX.1-dev',
      stylization_level = 3,
      detail_level = 4,
      color_level = 5,
      lighting_level = 2,
      width = 1024,
      height = 1024,
      consumer_id,
      api_key,
    } = body

    const response = await heurist.smartgen.generateImage({
      description,
      image_model,
      stylization_level,
      detail_level,
      color_level,
      lighting_level,
      width,
      height,
      consumer_id,
      api_key,
    })

    return NextResponse.json({ success: true, result: response })
  } catch (error) {
    console.error('Smart image generation failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}
