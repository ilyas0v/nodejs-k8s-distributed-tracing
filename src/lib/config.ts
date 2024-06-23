import dotenv from 'dotenv';
dotenv.config({path: __dirname + '/.env'});

export type ServiceName = 'service-a' | 'service-b' | 'service-c';

export const config: {
    [key in ServiceName]: string | undefined;
} = {
    'service-a': process.env.SERVICE_A_ENDPOINT,
    'service-b': process.env.SERVICE_B_ENDPOINT,
    'service-c': process.env.SERVICE_C_ENDPOINT
};