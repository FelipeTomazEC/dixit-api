import { Express, json } from 'express';
import cors from 'cors';

export const setupMiddlewares = (app: Express) => {
  app.use(json());
  app.use(
    cors({
      origin: ['http://localhost:3001', '*.ngrok.io'],
    }),
  );
};
