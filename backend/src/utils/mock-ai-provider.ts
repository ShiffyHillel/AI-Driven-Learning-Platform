import { AiProvider } from "./ai-provider";

export default class MockAiProvider implements AiProvider {
    async generateLesson(topic: string, prompt: string): Promise<string> {
        return `
        📚 Mock Lesson — ${topic}
        
        Welcome to your lesson!
        You asked: "${prompt}"
        
        Here is a structured mock response:
        
        1. Introduction to ${topic}
           This is an auto-generated lesson for demonstration purposes.
        
        2. Key Concepts
           - Concept A: Understanding the basics of ${topic}
           - Concept B: Applying knowledge in real scenarios
           - Concept C: Advanced techniques
        
        3. Summary
           This lesson covered the main aspects of ${topic}.
           Keep learning and exploring!
        `;
    }
}