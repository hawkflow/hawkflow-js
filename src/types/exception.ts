import { RequestOptions } from './request';

/**
 * Options for /exception request
 */
export type ExceptionOptions = RequestOptions & {
  exception?: string;
};
