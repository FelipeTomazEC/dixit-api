import express from 'express';
import { setupMiddlewares } from './config/setup-middlewares';
import { setupRoutes } from './config/setup-routes';

export const createExpressApplication = () => {
  const app = express();
  setupMiddlewares(app);
  setupRoutes(app);

  return app;
};
