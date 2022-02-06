import { HttpStatusCode } from '@interface-adapters/http/http-response-code';
import { HttpPresenter } from '@interface-adapters/presenters/http-presenter';
import { Response } from 'express';

export const createExpressHttpPresenter = (
  res: Response,
  successStatus = HttpStatusCode.OK,
): HttpPresenter<any> => {
  return new HttpPresenter(({ body, headers, statusCode }) => {
    headers.forEach((header) => res.setHeader(header.name, header.value));
    res.status(statusCode);

    return res.json(body);
  }, successStatus);
};
