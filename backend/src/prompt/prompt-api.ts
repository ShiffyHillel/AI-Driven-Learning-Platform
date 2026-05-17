import { Router, Request, Response } from "express";
import PromptService from "./prompt-service";

export default class PromptApi {
    public router: Router;

    constructor(private promptService: PromptService) {
        this.router = Router();
        this.setRoutes();
    }

    setRoutes() {
        // POST /api/prompts — שליחת פרומפט וקבלת שיעור מה-AI
        this.router.post("/", async (req: Request, res: Response) => {
            const userId = (req as any).userId;
            const { categoryId, subCategoryId, topic, prompt } = req.body;

            const result = await this.promptService.createPrompt(
                userId,
                categoryId,
                subCategoryId,
                topic,
                prompt
            );

            res.status(201).send(result);
        });

        // GET /api/prompts/history — היסטוריית למידה של המשתמש
        this.router.get("/history", async (req: Request, res: Response) => {
            const userId = (req as any).userId;
            const prompts = await this.promptService.getPromptsByUserId(userId);
            res.send(prompts);
        });

        // GET /api/prompts/:id — קבלת prompt לפי id
        this.router.get("/:id", async (req: Request, res: Response) => {
const prompt = await this.promptService.getPromptById(String(req.params.id));
            if (!prompt) {
                res.status(404).send("Prompt not found");
                return;
            }
            res.send(prompt);
        });

        // GET /api/prompts — כל ה-prompts (Admin)
        this.router.get("/", async (req: Request, res: Response) => {
            const prompts = await this.promptService.getAllPrompts();
            res.send(prompts);
        });
    }
}