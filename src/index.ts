import { getExpressApp } from "./lib/express";
import dotenv from 'dotenv';
import { expressMiddleware } from 'zipkin-instrumentation-express';
import { Zipkin } from "./lib/zipkin";

dotenv.config();

const start = async () => {
    const serviceName = process.env.SERVICE_TYPE;
    const port = process.env.PORT || 3000;
    const zipkinBaseUrl = process.env.ZIPKIN_BASE_URL || 'http://localhost:9411';

    if (!serviceName) {
        throw new Error('SERVICE_TYPE is not defined');
    }

    console.log(`Serving ${serviceName}...`)

    const tracer = Zipkin.getTracer(serviceName, zipkinBaseUrl);
    

    try {
        const app = getExpressApp();
        
        // Apply the Zipkin middleware
        app.use(expressMiddleware({ tracer }));

        const service = await import(`./services/${serviceName}/index`);
        const router = await service.getRoutes();
        app.use('/', router);
        app.listen(port, () => {
            console.log(`${serviceName} listening at ${port}`);
        });
    } catch (err) {
        console.error(err);
    }
};

start().catch((err) => {
    console.error(err);
    process.exit(1);
});