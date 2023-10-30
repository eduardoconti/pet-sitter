export interface SerializedException<T = unknown> {
  message: string;
  codigoInterno: string;
  stack?: string;
  metadata?: T;
}

export abstract class BaseException extends Error {
  abstract codigoInterno: string;

  constructor(message: string, readonly metadata?: unknown) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON<T>(): SerializedException<T> {
    return {
      message: this.message,
      codigoInterno: this.codigoInterno,
      stack: this.stack,
      metadata: this.metadata as T,
    };
  }
}
