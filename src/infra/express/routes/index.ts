import { HttpStatusCode } from '@interface-adapters/http/http-response-code';
import { Router } from 'express';

export const IndexRoute = () => {
  const router = Router();

  router.get('/info', (_, res) => {
    res.status(HttpStatusCode.OK).json({
      name: 'Dixit API',
      version: '1.0.0',
    });
  });

  return router;
};
