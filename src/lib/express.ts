import express from 'express';

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