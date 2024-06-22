import { Request, Response, Router } from 'express';
import { getExpressRouter } from '../../lib/express';

export const getRoutes = () => {
    const router = getExpressRouter();
    
    router.get('/', (req: Request, res: Response) => {
        res.json({
            message: 'Hello from Service C index!'
        });
    });

    router.get('/1', (req: Request, res: Response) => {
        // sleep for 1 second
        setTimeout(() => {
            res.json({
                message: 'Hello from Service C 1!'
            });
        }, 10);
    });

    router.get('/2', (req: Request, res: Response) => {
        res.json({
            message: 'Hello from Service C 2!'
        });
    });

    router.get('/1/1', (req: Request, res: Response) => {
        res.json({
            message: 'Hello from Service C 1/1!'
        });
    });

    return router;
};