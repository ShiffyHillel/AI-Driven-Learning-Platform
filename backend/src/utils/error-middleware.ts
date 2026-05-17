import { Request, Response, NextFunction } from "express";

export default class ErrorMiddleware {
    static handle(err: any, req: Request, res: Response, next: NextFunction) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
}