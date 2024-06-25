import { Request, Response, Router } from 'express';
import { getExpressRouter, routeWrapper } from '../../lib/express';
import { callService } from '../../lib/http';

export const getRoutes = async () => {
    const router = getExpressRouter();

    router.get('/', routeWrapper(async (data: any) => {
        await callService({
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
            serviceName: 'service-b',
            method: 'GET',
            url: '/1'
        });

        return { success: true };
    }));

    router.get('/routeWithError', routeWrapper(async (data: any) => {
        await callService({
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
            url: '/routeWithError'
        });
    }));

    router.get('/routeWithLongOperation', routeWrapper(async (data: any) => {
        await callService({
            serviceName: 'service-c',
            method: 'GET',
            url: '/routeWithLongOperation'
        });

        await callService({
            serviceName: 'service-b',
            method: 'GET',
            url: '/1'
        });

        await callService({
            serviceName: 'service-b',
            method: 'GET',
            url: '/1/1'
        });
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