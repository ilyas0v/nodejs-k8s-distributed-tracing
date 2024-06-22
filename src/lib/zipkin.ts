import { BatchRecorder, ExplicitContext, Tracer, jsonEncoder } from "zipkin";
import CLSContext from "zipkin-context-cls";
import { HttpLogger } from "zipkin-transport-http";
import wrapFetch from 'zipkin-instrumentation-fetch';
import fetch from "node-fetch";


export class Zipkin {
    private static instance: Tracer | null = null;

    static getTracer = (serviceName: string, zipkinBaseUrl: string): Tracer => {
        if (!Zipkin.instance) {
            const ctxImpl = new CLSContext('zipkin', true);
            const recorder = new BatchRecorder({
                logger: new HttpLogger({
                    endpoint: `${zipkinBaseUrl || 'http://localhost:9411'}/api/v2/spans`,
                    jsonEncoder: jsonEncoder.JSON_V2
                })
            });
            Zipkin.instance = new Tracer({ ctxImpl, recorder, localServiceName: serviceName});
        }
        return Zipkin.instance;
    }
}

export const createFetcher = (remoteServiceName: string, tracer: Tracer) => {
    return wrapFetch(fetch,
      {
        tracer:tracer,
        remoteServiceName:remoteServiceName
      }
    );
  }

export const getUrlContents = function(url: string, zipkinFetch: any) {
    return new Promise((resolve, reject)=>{
      zipkinFetch(url)
      .then((res: any) => res.text())
      .then((body: any) => resolve(body));
    })
  }