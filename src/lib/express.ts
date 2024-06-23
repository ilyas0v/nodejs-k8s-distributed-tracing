import express, { Request, Response, NextFunction } from 'express';

export const getExpressApp = () => {
    const app = express();
    app.use(express.json());
    return app;
}

export const getExpressRouter = () => {
    const router = express.Router();
    router.use(express.json());
    return router;
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    const message = err.message || 'Internal Server Error';
    res.status(500).json({ error: message });
};

type HandlerFunction = (data: any) => Promise<any>;

export const routeWrapper = (handler: HandlerFunction) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await handler(req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
};