import OpenAI from "openai";
import { AiProvider } from "./ai-provider";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default class OpenAiProvider implements AiProvider {
    async generateLesson(topic: string, prompt: string): Promise<string> {
        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a helpful teacher. Generate a clear and structured lesson about the topic: ${topic}`
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        return response.choices[0].message.content ?? "No response from AI";
    }
}