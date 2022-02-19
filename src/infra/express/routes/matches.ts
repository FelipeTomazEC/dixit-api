import { Router } from 'express';
import { createMatchHandler } from '../handlers/create-match-handler';
import { joinMatchHandler } from '../handlers/join-match-handler';

export const MatchesRoutes = () => {
  const router = Router();
  router.post('/matches', createMatchHandler);
  router.post('/matches/:match_code', joinMatchHandler);
  return router;
};
