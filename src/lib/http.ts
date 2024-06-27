import fetch, { RequestInit } from 'node-fetch';
import { ServiceName, config } from './config';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
    serviceName: ServiceName;
    method: HttpMethod;
    url: string;
    data?: Record<string, any>;
    headers?: { [key: string]: string };
}


export const httpRequest = async ({ serviceName, method, url, data, headers = { 'Content-Type': 'application/json' }}: RequestOptions) => {
    const options: RequestInit = {
        method,
        headers,
        body: ['GET', 'DELETE'].includes(method) ? undefined : JSON.stringify(data),
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const json = await response.json();
            const message = json.message || json.error || 'Error from service: ' + serviceName;
            throw new Error(message);
        }
        return await response.json(); // Assuming the response is JSON
    } catch (error) {
        throw error;
    }
};

export const callService = async ({
    serviceName,
    method, 
    url, 
    data,
}: {
    serviceName: ServiceName,
    method: HttpMethod,
    url: string,
    data?: Record<string, any>,
}) => {
    const fullUrl = `${config[serviceName]}${url}`;
    return await httpRequest({
        serviceName,
        method,
        url: fullUrl,
        data,
    });
};