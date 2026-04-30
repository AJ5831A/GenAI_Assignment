export class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
  }
}

export function badRequest(message) {
  return new HttpError(400, message);
}

export function serverError(message) {
  return new HttpError(500, message);
}

export function badGateway(message) {
  return new HttpError(502, message);
}
