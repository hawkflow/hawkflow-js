import { RequestOptions } from './request';

/**
 * Options for timed requests: /start, /end
 */
export type TimedOptions = RequestOptions & {
  uid?: string;
};
