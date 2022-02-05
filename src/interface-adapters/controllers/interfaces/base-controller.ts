import { InternalError } from '@common/errors/internal-error';
import { HttpRequest } from '@interface-adapters/http/http-request';
import { UseCaseInputPort } from '@use-cases/ports/usecase-input-port';
import { UseCaseOutputPort } from '@use-cases/ports/usecase-output-port';
import { HttpController } from './http-controller.interface';
import { Logger } from './logger.interface';

export interface BaseControllerDependencies<T> {
  useCase: UseCaseInputPort<T>;
  presenter: UseCaseOutputPort<any>;
  logger: Logger;
}

export abstract class BaseController<T> implements HttpController {
  constructor(private readonly dependencies: BaseControllerDependencies<T>) {}

  async handle(request: HttpRequest): Promise<void> {
    const { useCase, presenter, logger } = this.dependencies;
    try {
      await useCase.execute(this.extractParamsFromRequest(request));
    } catch (err) {
      await logger.log(err);
      return presenter.failure(new InternalError(err as Error));
    }
  }

  protected abstract extractParamsFromRequest(request: HttpRequest): T;
}
