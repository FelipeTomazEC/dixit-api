import { InternalError } from '@common/errors/internal-error';
import {
  BaseController,
  BaseControllerDependencies,
} from '@interface-adapters/controllers/interfaces/base-controller';
import { Logger } from '@interface-adapters/controllers/interfaces/logger.interface';
import { HttpRequest } from '@interface-adapters/http/http-request';
import { getMock } from '@test/test-helpers/get-mock';
import { UseCaseInputPort } from '@use-cases/ports/usecase-input-port';
import { UseCaseOutputPort } from '@use-cases/ports/usecase-output-port';

type MakeSUT<T> = (
  dependencies: BaseControllerDependencies<T>,
) => BaseController<T>;

export const runBaseControllerTests = <T>(makeSut: MakeSUT<T>) => {
  const useCase = getMock<UseCaseInputPort<any>>(['execute']);
  const presenter = getMock<UseCaseOutputPort<any>>(['failure']);
  const logger = getMock<Logger>(['log']);
  const sut = makeSut({ useCase, presenter, logger });

  it('should send internal errors to the presenter and the logger.', async () => {
    const request = new HttpRequest({ method: 'GET' });
    const error = new Error('Some weird error');
    jest.spyOn(useCase, 'execute').mockRejectedValueOnce(error);
    await sut.handle(request);
    expect(presenter.failure).toBeCalledWith(new InternalError(error));
    expect(logger.log).toBeCalledWith(error);
  });
};
