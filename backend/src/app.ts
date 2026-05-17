import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

import DbConn from "./utils/db-conn";
import UserIdMiddleware from "./utils/user-id-middleware";
import ErrorMiddleware from "./utils/error-middleware";
import { AiProvider } from "./utils/ai-provider";
import OpenAiProvider from "./utils/openai-provider";
import MockAiProvider from "./utils/mock-ai-provider";

import UserDal from "./user/user-dal";
import UserService from "./user/user-service";
import UserApi from "./user/user-api";

import CategoryDal from "./category/category-dal";
import CategoryService from "./category/category-service";
import CategoryApi from "./category/category-api";

import PromptDal from "./prompt/prompt-dal";
import PromptService from "./prompt/prompt-service";
import PromptApi from "./prompt/prompt-api";

dotenv.config();

const HOST = "127.0.0.1";
const PORT = Number(process.env.PORT) || 5000;

export default class App {
    private app: Express;
    private dbConn!: DbConn;

    constructor() {
        this.app = express();
    }

    async init() {
        this.dbConn = new DbConn();
        await this.dbConn.init();

        // בחירת AI Provider לפי .env
        const aiProvider: AiProvider = process.env.AI_PROVIDER === "openai"
            ? new OpenAiProvider()
            : new MockAiProvider();

        console.log(`AI Provider: ${process.env.AI_PROVIDER === "openai" ? "OpenAI ✅" : "Mock 🤖"}`);

        const userDal = new UserDal(this.dbConn);
        const userService = new UserService(userDal);
        const userApi = new UserApi(userService);

        const categoryDal = new CategoryDal(this.dbConn);
        const categoryService = new CategoryService(categoryDal);
        const categoryApi = new CategoryApi(categoryService);

        // Seed קטגוריות בהפעלה ראשונה
        await categoryService.seedData();

        const promptDal = new PromptDal(this.dbConn);
        const promptService = new PromptService(promptDal, aiProvider);
        const promptApi = new PromptApi(promptService);

        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(UserIdMiddleware.validate);

        this.app.use("/api/users", userApi.router);
        this.app.use("/api/categories", categoryApi.router);
        this.app.use("/api/prompts", promptApi.router);

        this.app.use(ErrorMiddleware.handle);

        this.app.listen(PORT, HOST, () => {
            console.log(`Server is listening on: http://${HOST}:${PORT}/`);
        });
    }

    async terminate() {
        await this.dbConn.terminate();
    }
}