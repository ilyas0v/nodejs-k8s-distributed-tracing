import express, { Request, Response } from 'express';

export const serve = async () => {
    const app = express();
    const port = process.env.PORT || 3000;

    app.get('/', (req: Request, res: Response) => {
        res.status(200).send('Hello from Service B index!');
    });
    app.get('/1', (req: Request, res: Response) => {
        res.status(200).send('Hello from Service B 1!');
    });
    app.get('/2', (req: Request, res: Response) => {
        res.status(200).send('Hello from Service B 2!');
    });

    app.listen(port, () => {
        console.log(`Service B listening at ${port}`);
    });
};