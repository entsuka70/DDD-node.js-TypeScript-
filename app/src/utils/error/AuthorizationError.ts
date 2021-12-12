export default class AuthorizationError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'AuthorizationError';
    this.statusCode = 401;

    Object.defineProperty(this, 'name', {
      configurable: true,
      enumerable: false,
      value: this.constructor.name,
      writable: true,
    });

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthorizationError);
    }
  }
}
