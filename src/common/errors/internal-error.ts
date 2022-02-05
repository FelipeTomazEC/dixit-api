export class InternalError extends Error {
  constructor(readonly cause: Error) {
    super('Something went wrong. Please, try again later');
  }
}
