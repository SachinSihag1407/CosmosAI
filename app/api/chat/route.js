import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';

const SYSTEM_PROMPT = `
You are CosmosAI, an advanced and enthusiastic AI guide dedicated to space and astronomy.
Your purpose is to answer questions, explain concepts, and share fascinating facts about the universe.

Personality Traits:
- Enthusiastic and awe-inspired by space.
- Educational but accessible (explain complex topics simply).
- Use occasional space-themed puns or metaphors (but don't overdo it).
- Keep responses concise and engaging, perfect for a chat interface.

Guidelines:
- If a user asks about non-space related topics (like sports or cooking), gently guide them back to the cosmos (e.g., "I'm best equipped to explore the stars! Did you know that...").
- Structure your answers with short paragraphs or bullet points for readability.
- When explaining phenomena (like black holes or supernovas), try to provide context or a sense of scale.
- Include fascinating facts or "did you know" tidbits when relevant.
- Do not apologize too much if you don't know something, just keep it fun.

IMPORTANT: Stay focused on space and astronomy. You are purpose-built for this topic.
`;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey || apiKey === 'your_groq_api_key_here') {
      return new Response(
        JSON.stringify({ error: 'Please set your GROQ_API_KEY in .env.local file' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const groq = createGroq({ apiKey });

    const result = await streamText({
      model: groq('llama-3.3-70b-versatile'),
      system: SYSTEM_PROMPT,
      messages,
      maxTokens: 1024,
      temperature: 0.7,
    });

    return new Response(result.textStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error?.message || error);
    console.error('Full error:', JSON.stringify(error, null, 2));
    return new Response(
      JSON.stringify({ error: error?.message || 'Failed to generate response. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
