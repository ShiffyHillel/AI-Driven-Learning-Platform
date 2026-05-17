export interface AiProvider {
    generateLesson(topic: string, prompt: string): Promise<string>;
}