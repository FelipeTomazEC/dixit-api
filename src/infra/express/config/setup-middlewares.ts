import { Express, json } from 'express';

export const setupMiddlewares = (app: Express) => {
  app.use(json());
};
