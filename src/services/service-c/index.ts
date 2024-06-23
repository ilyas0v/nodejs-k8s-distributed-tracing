import { Request, Response, Router } from 'express';
import { getExpressRouter } from '../../lib/express';
import { callService } from '../../lib/http';

export const getRoutes = () => {
    const router = getExpressRouter();
    
    router.get('/', (req: Request, res: Response) => {
        res.json({
            message: 'Hello from Service C index!'
        });
    });

    router.get('/1', async (req: Request, res: Response) => {

        // sleep for 1 second
        setTimeout(() => {
            res.json({
                message: 'Hello from Service C 1!'
            });
        }, 10);

        //throw new Error('Error from Service C 1');
    });

    router.get('/2', (req: Request, res: Response) => {
        throw new Error('Error from Service C 2');
    });

    router.get('/1/1', async (req: Request, res: Response) => {

        await callService({
            serviceName: 'service-b',
            method: 'GET',
            url: '/1/1'
        });

        res.json({
            message: 'Hello from Service C 1/1!'
        });
    });

    return router;
};