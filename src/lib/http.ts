import fetch, { RequestInit } from 'node-fetch';
import { ServiceName, config } from './config';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
    method: HttpMethod;
    url: string;
    data?: Record<string, any>;
    headers?: { [key: string]: string };
}

export const httpRequest = async ({ method, url, data, headers = { 'Content-Type': 'application/json' } }: RequestOptions) => {
    const options: RequestInit = {
        method,
        headers,
        body: ['GET', 'DELETE'].includes(method) ? undefined : JSON.stringify(data),
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json(); // Assuming the response is JSON
    } catch (error) {
        console.error('HTTP Request Failed:', error);
        throw error;
    }
};

export const callService = async ({
    serviceName,
    method, 
    url, 
    data
}: {
    serviceName: ServiceName,
    method: HttpMethod,
    url: string,
    data?: Record<string, any>
}) => {
    const fullUrl = `${config[serviceName]}/${url}`;
    return await httpRequest({
        method,
        url: fullUrl,
        data
    });
};