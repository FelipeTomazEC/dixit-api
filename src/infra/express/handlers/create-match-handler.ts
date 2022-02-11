import { ConsoleLogger } from '@infra/implementations/console-logger';
import { InMemoryMatchRepository } from '@infra/implementations/in-memory-match-repository';
import { UUIDRoomCodeGenerator } from '@infra/implementations/uuid-room-code-generator';
import { CreateMatchController } from '@interface-adapters/controllers/create-match';
import { HttpStatusCode } from '@interface-adapters/http/http-response-code';
import { CreateMatchUseCase } from '@use-cases/create-match';
import { Request, Response } from 'express';
import { createExpressHttpPresenter } from '../helpers/create-express-http-presenter';
import { parseHttpRequest } from '../helpers/parse-http-request';

export const createMatchHandler = (req: Request, res: Response) => {
  const codeGenerator = new UUIDRoomCodeGenerator();
  const matchManager = InMemoryMatchRepository.getInstance();
  const logger = new ConsoleLogger();
  const presenter = createExpressHttpPresenter(
    res,
    HttpStatusCode.RESOURCE_CREATED,
  );
  const useCase = new CreateMatchUseCase({
    codeGenerator,
    matchManager,
    presenter,
  });
  const controller = new CreateMatchController({ logger, presenter, useCase });
  controller.handle(parseHttpRequest(req));
};
