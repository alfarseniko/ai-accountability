import { NextResponse } from 'next/server' // Import NextResponse from Next.js for handling responses
import OpenAI from 'openai' // Import OpenAI library for interacting with the OpenAI API

// System prompt for the AI, providing guidelines on how to respond to users
const systemPrompt = `Engage the user in a conversation about the tasks they wish to accomplish for the day. Ask specific questions to understand the nature of each task and the preferred time for completion. Based on the provided details, organize the tasks in chronological order to create a well-structured daily plan. After the plan has been finalized, ask the user permission to return the plan in a JSON format and then return the plan in the following JSON format

{
    {
        time: str,
        task: str,
    },
}

`

// POST function to handle incoming requests
export async function POST(req) {
    const openai = new OpenAI() // Create a new instance of the OpenAI client
    const data = await req.json() // Parse the JSON body of the incoming request

    // Create a chat completion request to the OpenAI API
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: systemPrompt }, ...data], // Include the system prompt and user messages
        // data is already an object
        model: 'gpt-4o', // Specify the model to use
        stream: true, // Enable streaming responses
    })

    // Create a ReadableStream to handle the streaming response
    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder() // Create a TextEncoder to convert strings to Uint8Array
            try {
                // Iterate over the streamed chunks of the response
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content // Extract the content from the chunk
                    if (content) {
                        const text = encoder.encode(content) // Encode the content to Uint8Array
                        controller.enqueue(text) // Enqueue the encoded text to the stream
                    }
                }
            } catch (err) {
                controller.error(err) // Handle any errors that occur during streaming
            } finally {
                controller.close() // Close the stream when done
            }
        },
    })

    return new NextResponse(stream) // Return the stream as the response
}

const tasks = [{ "time": "5:00 AM", "task": "Wake up" }, { "time": "5:15 AM", "task": "Clean your car" }, { "time": "6:00 AM", "task": "Clean the house" }, { "time": "7:00 AM - 9:00 AM", "task": "Free time or rest" }, { "time": "9:00 AM - 12:00 PM", "task": "Do homework" }, { "time": "12:00 PM - 1:00 PM", "task": "Free time or relax" }, { "time": "1:00 PM", "task": "Have lunch" }, { "time": "2:00 PM - 5:00 PM", "task": "Rest" }, { "time": "5:00 PM - 8:00 PM", "task": "Play basketball" }, { "time": "8:00 PM onwards", "task": "Relax and prepare for bed" }, { "time": "10:00 PM", "task": "Sleep" }] 