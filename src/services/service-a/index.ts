import { Request, Response, Router } from 'express';
import { getExpressRouter, routeWrapper } from '../../lib/express';
import { callService } from '../../lib/http';

export const getRoutes = async () => {
    const router = getExpressRouter();

    router.get('/', routeWrapper(async (data: any) => {
        const b = await callService({
            serviceName: 'service-b',
            method: 'GET',
            url: '/1'
        });

        await callService({
            serviceName: 'service-c',
            method: 'GET',
            url: '/1'
        });

        await callService({
            serviceName: 'service-c',
            method: 'GET',
            url: '/1'
        });

        await callService({
            serviceName: 'service-c',
            method: 'GET',
            url: '/1'
        });

        await callService({
            serviceName: 'service-c',
            method: 'GET',
            url: '/1/1'
        });

        // await callService({
        //     serviceName: 'service-c',
        //     method: 'GET',
        //     url: '/2'
        // });

        const result = {
            b,
        }

        return result;
    }));

    router.get('/1', (req: Request, res: Response) => {
        res.status(200).send('Hello from Service A 1!');
    });

    router.get('/2', (req: Request, res: Response) => {
        res.status(200).send('Hello from Service A 2!');
    });

    router.get('/1/1', (req: Request, res: Response) => {
        res.status(200).send('Hello from Service A 1/1!');
    });

    return router;
};