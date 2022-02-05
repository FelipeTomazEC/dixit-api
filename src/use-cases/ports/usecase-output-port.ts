export interface UseCaseOutputPort<T> {
  success(response: T): void;
  failure(error: Error): void;
}
