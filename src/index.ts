const start = async () => {
    const serviceName = process.env.SERVICE_TYPE;

    if (!serviceName) {
        throw new Error('SERVICE_TYPE is not defined');
    }

    try {
        const service = await import(`./services/${serviceName}/index`);
        service.serve();
    } catch (err) {
        console.error(err);
    }
};

start().catch((err) => {
    console.error(err);
    process.exit(1);
});