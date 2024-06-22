import dotenv from 'dotenv';
dotenv.config();

export type ServiceName = 'service-a' | 'service-b';

export const config: {
    [key in ServiceName]: string | undefined;
} = {
    'service-a': process.env.SERVICE_A_URL,
    'service-b': process.env.SERVICE_B_URL,
};