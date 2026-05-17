import { Collection } from "mongodb";
import DbConn from "../utils/db-conn";
import { Prompt, PromptWithId } from "./prompt-models";

const PROMPT_COLLECTION_NAME = "prompts";
export const PROMPT_NOT_FOUND_ERROR = "Prompt not found";

export default class PromptDal {
    private promptCollection: Collection<Prompt>;

    constructor(dbConn: DbConn) {
        this.promptCollection = dbConn.getDb().collection(PROMPT_COLLECTION_NAME);
    }

    async createPrompt(prompt: Prompt): Promise<Prompt> {
     await this.promptCollection.insertOne(prompt);
        const { _id, ...promptWithoutId } = prompt as any;
        return promptWithoutId;
    }

    async getPromptsByUserId(userId: string): Promise<Array<Prompt>> {
        const prompts: Array<PromptWithId> = await this.promptCollection
            .find({ userId })
            .sort({ createdAt: -1 })
            .toArray();
        prompts.forEach(p => delete p._id);
        return prompts;
    }

    async getAllPrompts(): Promise<Array<Prompt>> {
        const prompts: Array<PromptWithId> = await this.promptCollection
            .find({})
            .sort({ createdAt: -1 })
            .toArray();
        prompts.forEach(p => delete p._id);
        return prompts;
    }

    async getPromptById(id: string): Promise<Prompt> {
        const prompt: PromptWithId | null = await this.promptCollection.findOne({ id });
        if (!prompt) {
            throw new Error(PROMPT_NOT_FOUND_ERROR);
        }
        delete prompt._id;
        return prompt;
    }
}