import { Router, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import UserService from "./user-service";
import { User } from "./user-models";

export default class UserApi {
    public router: Router;

    constructor(private userService: UserService) {
        this.router = Router();
        this.setRoutes();
    }

    setRoutes() {
        // POST /api/users — רישום משתמש חדש
        this.router.post("/", async (req: Request, res: Response) => {
            const { name, phone } = req.body;

            const user: User = {
                id: uuid(),
                name,
                phone,
                createdAt: new Date()
            };

           try {
    const created = await this.userService.createUser(user);
    res.status(201).send(created);
} catch (err: any) {
    if (err.message === "User already exists") {
        res.status(409).send("User already exists");
        return;
    }
    throw err;
}
        });

        // GET /api/users/:id — קבלת משתמש לפי id
        this.router.get("/:id", async (req: Request, res: Response) => {
const user = await this.userService.getUserById(String(req.params.id));
            if (!user) {
                res.status(404).send("User not found");
                return;
            }
            res.send(user);
        });

        // GET /api/users — קבלת כל המשתמשים (Admin)
        this.router.get("/", async (req: Request, res: Response) => {
            const users = await this.userService.getAllUsers();
            res.send(users);
        });
    }
}