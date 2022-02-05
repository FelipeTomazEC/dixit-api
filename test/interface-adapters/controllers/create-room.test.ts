import { CreateRoomController } from '@interface-adapters/controllers/create-room';
import { Logger } from '@interface-adapters/controllers/interfaces/logger.interface';
import { HttpRequest } from '@interface-adapters/http/http-request';
import { getMock } from '@test/test-helpers/get-mock';
import { CreateRoomUseCase } from '@use-cases/create-room';
import { UseCaseOutputPort } from '@use-cases/ports/usecase-output-port';
import { runBaseControllerTests } from './base-controller-tests';
import faker from 'faker';

describe('Create room http controller tests', () => {
  const useCase = getMock<CreateRoomUseCase>(['execute']);
  const presenter = getMock<UseCaseOutputPort<any>>([]);
  const logger = getMock<Logger>([]);
  const sut = new CreateRoomController({ useCase, presenter, logger });

  runBaseControllerTests((deps) => new CreateRoomController(deps));

  it('should pass the username and the avatar to the use case', () => {
    const creatorAvatar = faker.internet.avatar();
    const creatorUsername = faker.internet.userName();

    const request = new HttpRequest({
      method: 'POST',
      body: { creatorAvatar, creatorUsername },
    });

    sut.handle(request);

    expect(useCase.execute).toBeCalledWith({ creatorAvatar, creatorUsername });
  });
});
