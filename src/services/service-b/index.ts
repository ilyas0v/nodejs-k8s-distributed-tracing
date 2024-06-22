import { Request, Response, Router } from 'express';
import { getExpressRouter } from '../../lib/express';

export const getRoutes = async () => {
    const router = getExpressRouter();
    
    router.get('/', (req: Request, res: Response) => {
        res.status(200).send('Hello from Service B index!');
    });

    router.get('/1', (req: Request, res: Response) => {
        res.status(200).send('Hello from Service B 1!');
    });

    router.get('/2', (req: Request, res: Response) => {
        res.status(200).send('Hello from Service B 2!');
    });

    router.get('/1/1', (req: Request, res: Response) => {
        res.status(200).send('Hello from Service B 1/1!');
    });

    return router;
};