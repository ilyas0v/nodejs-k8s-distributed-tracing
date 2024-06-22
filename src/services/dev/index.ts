import { getExpressRouter } from '../../lib/express';

export const getRoutes = async () => {
    const router = getExpressRouter();
    const services = [
        { 'service-a': await import('../service-a/index') },
        { 'service-b': await import('../service-b/index') }
    ]

    for (const service of services) {
        const [path, svc] = Object.entries(service)[0];
        console.log(`Appending ${path}`, svc);
        const routesOfService = await svc.getRoutes();
        router.use(`/${path}`, routesOfService);
    }

    router.use('/test', (req, res) => {
        res.status(200).send('Hello from Dev!' + process.env.SERVICE_B_ENDPOINT);
    });

    return router;
};