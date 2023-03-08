import { TimedOptions } from './types/timed';
import { ExceptionOptions } from './types/exception';
import { MetricsOptions } from './types/metrics';

const REGEX = /^[a-zA-Z\d\s_-]*$/;

/**
 * @throws {Error}
 */
export function validateApiKey(apiKey: string) {
  if (!apiKey) {
    throw new Error('No API Key set.');
  }

  if (apiKey.length > 50) {
    throw new Error('Invalid API Key format.');
  }

  if (!REGEX.test(apiKey)) {
    throw new Error('Invalid API Key format.');
  }
}

/**
 * @throws {Error}
 */
export function validateTimedOptions(options: TimedOptions) {
  validateProcess(options.process);
  validateMeta(options.meta ?? '');
  validateUID(options.uid ?? '');
}

/**
 * @throws {Error}
 */
export function validateExceptionOptions(options: ExceptionOptions) {
  validateProcess(options.process);
  validateMeta(options.meta ?? '');
  validateExceptionMessage(options.exception ?? '');
}

/**
 * @throws {Error}
 */
export function validateMetricsOptions(options: MetricsOptions) {
  validateProcess(options.process);
  validateMeta(options.meta ?? '');
  validateMetricsItems(options.items);
}

/**
 * @throws {Error}
 */
export function validateProcess(process: string) {
  if (!process) {
    throw new Error('No process set.');
  }

  if (process.length > 250) {
    throw new Error('Process parameter exceeded max length of 250 characters.');
  }

  if (!REGEX.test(process)) {
    throw new Error('Process parameter contains unsupported characters.');
  }
}

/**
 * @throws {Error}
 */
export function validateMeta(meta: string) {
  if (meta.length > 500) {
    throw new Error('Meta parameter exceeded max length of 500 characters.');
  }

  if (!REGEX.test(meta)) {
    throw new Error('Meta parameter contains unsupported characters.');
  }
}

/**
 * @throws {Error}
 */
export function validateUID(uid: string) {
  if (uid.length > 50) {
    throw new Error('UID parameter exceeded max length of 50 characters.');
  }

  if (!REGEX.test(uid)) {
    throw new Error('UID parameter contains unsupported characters.');
  }
}

/**
 * @throws {Error}
 */
export function validateExceptionMessage(message: string) {
  if (message.length > 15000) {
    throw new Error(
      'ExceptionMessage parameter exceeded max length of 15000 characters.'
    );
  }
}

/**
 * @throws {Error}
 */
export function validateMetricsItems(items: Map<string, number>) {
  if (items.size == 0) {
    throw new Error('No items set.');
  }

  for (const [k, _] of Object.entries(items)) {
    if (k.length > 50) {
      throw new Error(`Item key ${k} exceeded max length of 50 characters.`);
    }
  }
}
