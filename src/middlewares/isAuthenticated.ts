import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
}

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Recebe o token.
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        // Valida o token.
        const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

        // Injeta o user_id no request.
        req.user_id = sub;
        return next();
    } catch (error) {
        return res.status(401).end();
    }
}