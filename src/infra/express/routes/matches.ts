import { Router } from 'express';
import { createMatchHandler } from '../handlers/create-match-handler';

export const MatchesRoutes = () => {
  const router = Router();
  router.post('/matches', createMatchHandler);
  return router;
};
