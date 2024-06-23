import { Request, Response } from 'express';
import { getExpressRouter } from '../../lib/express';
import { callService } from '../../lib/http';

export const getRoutes = () => {
    const router = getExpressRouter();

    router.get('/', (req: Request, res: Response) => {
        res.json({
            message: 'Hello from Service B index!'
        });
    });

    router.get('/1', async (req: Request, res: Response) => {

        // await callService({
        //     serviceName: 'service-c',
        //     method: 'GET',
        //     url: '/1'
        // });

        res.json({
            message: 'Hello from Service B 1!'
        });
    });

    router.get('/1/1', (req: Request, res: Response) => {
        res.json({
            message: 'Hello from Service B 1/1!'
        });
    });

    return router;
};