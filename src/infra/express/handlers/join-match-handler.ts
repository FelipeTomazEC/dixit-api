import { Request, Response } from 'express';
import { ConsoleLogger } from '@infra/implementations/console-logger';
import { InMemoryMatchRepository } from '@infra/implementations/in-memory-match-repository';
import { JoinMatchController } from '@interface-adapters/controllers/join-match';
import { JoinMatchUseCase } from '@use-cases/join-match';
import { createExpressHttpPresenter } from '../helpers/create-express-http-presenter';
import { parseHttpRequest } from '../helpers/parse-http-request';
import { Notifier } from '@use-cases/common-dependencies/notifier.interface';

export const joinMatchHandler =
  (notifier: Notifier) => (req: Request, res: Response) => {
    const matchRepo = InMemoryMatchRepository.getInstance();
    const logger = new ConsoleLogger();
    const presenter = createExpressHttpPresenter(res);
    const useCase = new JoinMatchUseCase({
      notifier,
      matchRepo,
      presenter,
    });
    const controller = new JoinMatchController({ logger, presenter, useCase });
    controller.handle(parseHttpRequest(req));
  };
