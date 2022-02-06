import { createExpressHttpPresenter } from '@infra/express/helpers/create-express-http-presenter';
import { HttpStatusCode } from '@interface-adapters/http/http-response-code';
import { Response } from 'express';

describe('Create Http Presenter helper tests.', () => {
  it('should take a express response object and create a callback with it.', () => {
    const res: Partial<Response> = {
      status: jest.fn(),
      json: jest.fn(),
      setHeader: jest.fn(),
    };

    const presenter = createExpressHttpPresenter(
      res as Response,
      HttpStatusCode.RESOURCE_CREATED,
    );
    presenter.success({});

    expect(res.json).toBeCalled();
    expect(res.status).toBeCalledWith(HttpStatusCode.RESOURCE_CREATED);
  });
});
