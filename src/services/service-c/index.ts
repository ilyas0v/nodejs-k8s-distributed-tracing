import { Request, Response, Router } from 'express';
import { getExpressRouter, routeWrapper } from '../../lib/express';
import { sleep } from '../../lib/utils';

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

        //throw new Error('Error from Service C 1');
    });

    router.get('/routeWithError', (req: Request, res: Response) => {
        throw new Error('Error from Service C 2');
    });

    router.get('/routeWithLongOperation', routeWrapper(async (data: any) => {
        await sleep(1000);
        return { success: true };
    }));

    router.get('/1/1', (req: Request, res: Response) => {
        res.json({
            message: 'Hello from Service C 1/1!'
        });
    });

    return router;
};