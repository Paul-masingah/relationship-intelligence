import AssemblyAI from 'assemblyai';
import OpenAI from 'openai';
import { SentimentAnalysis } from '../../client/src/types/types';

const assembly = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY!
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
});

export async function analyzeAudio(audioUrl: string) {
  // Transcribe audio
  const transcript = await assembly.transcripts.create({
    audio_url: audioUrl,
    sentiment_analysis: true,
    auto_highlights: true
  });

  // Get analysis
  const analysis = await getConversationAnalysis(transcript.text!);

  // Generate AI response
  const aiResponse = await generateAIResponse(transcript.text!, analysis);

  return {
    transcript: transcript.text,
    analysis: formatAnalysis(transcript, analysis),
    aiResponse
  };
}

async function getConversationAnalysis(text: string): Promise<SentimentAnalysis> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'system',
      content: `Analyze conversation for: 
      1. Overall sentiment (positive/negative/neutral)
      2. Confidence score (0-1)
      3. Key relationship themes
      Return JSON format only`
    }, {
      role: 'user',
      content: text
    }]
  });

  return JSON.parse(response.choices[0].message.content!);
}

async function generateAIResponse(text: string, analysis: SentimentAnalysis) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'system',
      content: `You're a relationship coach. Respond empathetically to this reflection: ${text}
      Detected sentiment: ${analysis.sentiment} (${analysis.confidence})
      Key themes: ${analysis.keyThemes.join(', ')}
      Keep response under 3 sentences.`
    }]
  });

  return response.choices[0].message.content!;
}
