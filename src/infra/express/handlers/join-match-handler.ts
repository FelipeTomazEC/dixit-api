import { Request, Response } from 'express';
import { ConsoleLogger } from '@infra/implementations/console-logger';
import { InMemoryMatchRepository } from '@infra/implementations/in-memory-match-repository';
import { JoinMatchController } from '@interface-adapters/controllers/join-match';
import { JoinMatchUseCase } from '@use-cases/join-match';
import { createExpressHttpPresenter } from '../helpers/create-express-http-presenter';
import { parseHttpRequest } from '../helpers/parse-http-request';
import { SocketIONotifier } from '@infra/implementations/socket-io-notifier';

export const joinMatchHandler = (req: Request, res: Response) => {
  const matchRepo = InMemoryMatchRepository.getInstance();
  const logger = new ConsoleLogger();
  const presenter = createExpressHttpPresenter(res);
  const notifier = SocketIONotifier.getInstance();
  const useCase = new JoinMatchUseCase({
    notifier,
    matchRepo,
    presenter,
  });
  const controller = new JoinMatchController({ logger, presenter, useCase });
  controller.handle(parseHttpRequest(req));
};
