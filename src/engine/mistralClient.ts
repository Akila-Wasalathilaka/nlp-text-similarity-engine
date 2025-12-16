import { WritingMode } from './modes.js';

export interface MistralResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class MistralClient {
  private apiKey: string;
  private baseUrl = 'https://api.mistral.ai/v1/chat/completions';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async rewriteParagraph(paragraph: string, mode: WritingMode): Promise<string> {
    const systemPrompt = `You are rewriting text originally written by a human.
Your goal is to produce natural, realistic human writing.
Avoid formulaic, overly polished, or repetitive structures.
Use varied sentence length and structure.
Maintain the requested writing mode and tone.`;

    const userPrompt = `Rewrite the following text so it sounds naturally written by a real person.

Requirements:
- Preserve meaning and factual accuracy
- Match this writing mode: ${mode}
- Use natural sentence variation
- Avoid predictable transitions and AI-like phrasing
- Maintain professional or academic tone as required

Text:
${paragraph}`;

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'mistral-large-latest',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.8,
          top_p: 0.9,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`Mistral API error: ${response.status}`);
      }

      const data: MistralResponse = await response.json();
      return data.choices[0]?.message?.content?.trim() || paragraph;
    } catch (error) {
      console.error('Mistral API error:', error);
      return paragraph; // Fallback to original
    }
  }
}