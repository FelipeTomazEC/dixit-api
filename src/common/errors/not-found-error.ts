export class NotFoundError extends Error {
  constructor(entityName: string, id: string) {
    super(`${entityName} with id ${id} was not found.`);
  }
}
