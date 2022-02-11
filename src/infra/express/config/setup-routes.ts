import { Express } from 'express';
import { IndexRoute } from '../routes';
import { MatchesRoutes } from '../routes/matches';

export const setupRoutes = (app: Express) => {
  app.use(IndexRoute());
  app.use(MatchesRoutes());
};
