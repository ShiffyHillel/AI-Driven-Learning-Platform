import { Router, Request, Response } from "express";
import CategoryService from "./category-service";

export default class CategoryApi {
    public router: Router;

    constructor(private categoryService: CategoryService) {
        this.router = Router();
        this.setRoutes();
    }

    setRoutes() {
        // GET /api/categories — קבלת כל הקטגוריות
        this.router.get("/", async (req: Request, res: Response) => {
            const categories = await this.categoryService.getAllCategories();
            res.send(categories);
        });

        // GET /api/categories/:id — קבלת קטגוריה לפי id
        this.router.get("/:id", async (req: Request, res: Response) => {
const category = await this.categoryService.getCategoryById(String(req.params.id));
            if (!category) {
                res.status(404).send("Category not found");
                return;
            }
            res.send(category);
        });

        // GET /api/categories/:id/sub-categories — קבלת תת-קטגוריות לפי קטגוריה
        this.router.get("/:id/sub-categories", async (req: Request, res: Response) => {
const subCategories = await this.categoryService.getSubCategoriesByCategoryId(String(req.params.id));            res.send(subCategories);
        });
    }
}