import { SocketIONotifier } from '@infra/implementations/socket-io-notifier';
import { Router } from 'express';
import { createMatchHandler } from '../handlers/create-match-handler';
import { joinMatchHandler } from '../handlers/join-match-handler';

export const MatchesRoutes = () => {
  const router = Router();
  const notifier = SocketIONotifier.getInstance();
  router.post('/matches', createMatchHandler);
  router.post('/matches/:match_code', joinMatchHandler(notifier));
  return router;
};
