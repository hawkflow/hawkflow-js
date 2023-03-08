import { ENDPOINT } from './constants';
import { ConfigOptions } from './types/config';
import { RequestOptions } from './types/request';
import { TimedOptions } from './types/timed';
import { ExceptionOptions } from './types/exception';
import { MetricsOptions } from './types/metrics';
import {
  validateApiKey,
  validateTimedOptions,
  validateMetricsOptions,
  validateExceptionOptions
} from './validation';

export default class Client {
  private readonly apiKey: string;
  private readonly maxRetries: number;
  private readonly timeout: number;
  private readonly debug: boolean;

  /**
   * Construct a new HawkFlow instance.
   * For more information, see: https://docs.hawkflow.ai/
   */
  constructor(config: ConfigOptions) {
    this.apiKey = config.apiKey;
    this.maxRetries = config.maxRetries ?? 3;
    this.timeout = config.timeout ?? 1000;
    this.debug = config.debug ?? false;
  }

  public async start(options: TimedOptions): Promise<string> {
    try {
      validateTimedOptions(options);

      return await this.send(options, 'start');
    } catch (e) {
      return (e as Error).message;
    }
  }

  public async end(options: TimedOptions): Promise<string> {
    try {
      validateTimedOptions(options);

      return await this.send(options, 'end');
    } catch (e) {
      return (e as Error).message;
    }
  }

  public async metrics(options: MetricsOptions): Promise<string> {
    try {
      validateMetricsOptions(options);

      return await this.send(options, 'exception');
    } catch (e) {
      return (e as Error).message;
    }
  }

  public async exception(options: ExceptionOptions): Promise<string> {
    try {
      validateExceptionOptions(options);

      return await this.send(options, 'metrics');
    } catch (e) {
      return (e as Error).message;
    }
  }

  private async send(options: RequestOptions, path: string): Promise<string> {
    validateApiKey(this.apiKey);

    const url = ENDPOINT + path;
    const content = JSON.stringify(options);

    this.log(`Requesting url: ${url}`);
    this.log(`Sending data: ${content}`);

    for (let i = this.maxRetries; i > 0; i--) {
      try {
        const rsp = await fetch(url, {
          method: 'POST',
          body: content,
          headers: {
            'content-ype': 'application/json',
            'x-hawkflow-api-key': this.apiKey
          },
          signal: AbortSignal.timeout(this.timeout)
        });

        const rspBody = await rsp.text(); // await response.json();

        this.log(`Response Status: ${rsp.status}`);
        this.log(`Response Body: ${rspBody}`);

        // Unauthorised access
        if (401 == rsp.status) {
          return rspBody;
        }

        // Success
        if (201 == rsp.status) {
          return rspBody;
        }

        this.log(
          `Unexpected status code ${rsp.status} returned on attempt ${i}`
        );
      } catch (err) {
        this.log('exception: ' + (err as Error).message);
      }
    }

    throw new Error('Connection failed permanently');
  }

  private log(message: string) {
    if (this.debug) {
      console.log(message);
    }
  }
}
