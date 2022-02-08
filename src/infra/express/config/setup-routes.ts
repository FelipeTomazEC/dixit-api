import { Express } from 'express';
import { IndexRoute } from '../routes';

export const setupRoutes = (app: Express) => {
  app.use(IndexRoute());
};
