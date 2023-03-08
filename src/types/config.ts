/**
 * Base Options for HawkFlow client
 */
export interface ConfigOptions {
  apiKey: string;
  maxRetries?: number;
  timeout?: number;
  debug?: boolean;
}
