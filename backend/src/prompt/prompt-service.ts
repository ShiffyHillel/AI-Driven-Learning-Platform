import { v4 as uuid } from "uuid";
import PromptDal, { PROMPT_NOT_FOUND_ERROR } from "./prompt-dal";
import { Prompt } from "./prompt-models";
import { AiProvider } from "../utils/ai-provider";

export default class PromptService {
    constructor(
        private promptDal: PromptDal,
        private aiProvider: AiProvider
    ) {}

    async createPrompt(
        userId: string,
        categoryId: string,
        subCategoryId: string,
        topic: string,
        userPrompt: string
    ): Promise<Prompt> {
        const response = await this.aiProvider.generateLesson(topic, userPrompt);

        const prompt: Prompt = {
            id: uuid(),
            userId,
            categoryId,
            subCategoryId,
            prompt: userPrompt,
            response,
            createdAt: new Date()
        };

        return this.promptDal.createPrompt(prompt);
    }

    async getPromptsByUserId(userId: string): Promise<Array<Prompt>> {
        return this.promptDal.getPromptsByUserId(userId);
    }

    async getAllPrompts(): Promise<Array<Prompt>> {
        return this.promptDal.getAllPrompts();
    }

    async getPromptById(id: string): Promise<Prompt | null> {
        try {
            return await this.promptDal.getPromptById(id);
        } catch (err: any) {
            if (err.message === PROMPT_NOT_FOUND_ERROR) {
                return null;
            }
            throw err;
        }
    }
}