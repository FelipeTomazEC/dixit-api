import { HttpRequest } from '@interface-adapters/http/http-request';
import {
  HeaderCollection,
  HttpMethod,
  ParamCollection,
} from '@interface-adapters/http/types';
import { Request } from 'express';

export const parseHttpRequest = (request: Request) => {
  const headers: HeaderCollection = Object.entries(request.headers).map(
    ([prop, value]) => ({ name: prop, value: value ?? '' }),
  );

  const params: ParamCollection = Object.entries(request.params).map(
    ([prop, value]) => ({ name: prop, value }),
  );

  const query: ParamCollection = Object.entries(request.query).map(
    ([prop, value]) => ({
      name: prop,
      value: typeof value === 'string' ? value : '',
    }),
  );

  return new HttpRequest({
    method: request.method as HttpMethod,
    body: request.body,
    headers,
    params,
    query,
  });
};
