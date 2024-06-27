import { errorHandler, getExpressApp } from "./lib/express";
import dotenv from 'dotenv';
import apm from 'elastic-apm-node';
dotenv.config();

const apmAgent = apm.start({
    serviceName: process.env.SERVICE_TYPE || 'unknown-service',
    serverUrl: process.env.ELASTIC_APM_SERVER_URL || 'http://localhost:8200',
    environment: process.env.APP_ENV || 'production',
});

const start = async () => {
    const serviceName = process.env.SERVICE_TYPE;
    const port = process.env.PORT || 3000;

    if (!serviceName) {
        throw new Error('SERVICE_TYPE is not defined');
    }

    console.log(`Serving ${serviceName}...`)    

    // Uncomment if use Zipkin:
    // const zipkinBaseUrl = process.env.ZIPKIN_BASE_URL || 'http://localhost:9411';
    // const tracer = Zipkin.getTracer(serviceName, zipkinBaseUrl);

    try {
        const app = getExpressApp();

        // Uncomment if use Zipkin:
        // app.use(expressMiddleware({ tracer }));

        const service = await import(`./services/${serviceName}/index`);
        const router = await service.getRoutes();
        app.use('/', router);

        // APply error handling middleware
        app.use(errorHandler);

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