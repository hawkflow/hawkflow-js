import { RequestOptions } from './request';

/**
 * Options for /metrics request
 */
export type MetricsOptions = RequestOptions & {
  items: Map<string, number>;
};
