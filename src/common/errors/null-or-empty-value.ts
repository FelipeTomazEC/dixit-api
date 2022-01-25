export class NullOrEmptyValueError extends Error {
  constructor(valueName: string) {
    super(`Value ${valueName} cannot be null/empty.`);
  }
}
