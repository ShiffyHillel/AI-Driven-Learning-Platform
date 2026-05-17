export interface Prompt {
    id: string;
    userId: string;
    categoryId: string;
    subCategoryId: string;
    prompt: string;
    response: string;
    createdAt: Date;
}

export interface PromptWithId extends Prompt {
    _id?: any;
}