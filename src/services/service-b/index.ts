import { Request, Response, Router } from 'express';
import { getExpressRouter } from '../../lib/express';
import { callService } from '../../lib/http';
import { Tracer } from 'zipkin';
import { createFetcher, getUrlContents } from '../../lib/zipkin';

export const getRoutes = (tracer: Tracer) => {
    const router = getExpressRouter();

    router.get('/', (req: Request, res: Response) => {
        res.json({
            message: 'Hello from Service B index!'
        });
    });

    router.get('/1', (req: Request, res: Response) => {
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