import { Request, Response, NextFunction } from "express";

export default class UserIdMiddleware {
    static validate(req: Request, res: Response, next: NextFunction) {
        const userId = req.header("X-User-Id");

        if (!userId) {
            res.status(401).send("Missing X-User-Id header");
            return;
        }

        (req as any).userId = userId;
        next();
    }
}