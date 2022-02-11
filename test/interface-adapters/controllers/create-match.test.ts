import { Logger } from '@interface-adapters/controllers/interfaces/logger.interface';
import { HttpRequest } from '@interface-adapters/http/http-request';
import { getMock } from '@test/test-helpers/get-mock';
import { UseCaseOutputPort } from '@use-cases/ports/usecase-output-port';
import { runBaseControllerTests } from './base-controller-tests';
import { CreateMatchController } from '@interface-adapters/controllers/create-match';
import { CreateMatchUseCase } from '@use-cases/create-match';

describe('Create match http controller tests', () => {
  const useCase = getMock<CreateMatchUseCase>(['execute']);
  const presenter = getMock<UseCaseOutputPort<any>>([]);
  const logger = getMock<Logger>([]);
  const sut = new CreateMatchController({ useCase, presenter, logger });

  runBaseControllerTests((deps) => new CreateMatchController(deps));

  it('should call the use case', () => {
    const request = new HttpRequest();
    sut.handle(request);
    expect(useCase.execute).toBeCalled();
  });
});
