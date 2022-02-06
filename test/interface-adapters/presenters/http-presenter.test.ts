import { InternalError } from '@common/errors/internal-error';
import { NullOrEmptyValueError } from '@common/errors/null-or-empty-value';
import { HttpResponse } from '@interface-adapters/http/http-response';
import { HttpStatusCode } from '@interface-adapters/http/http-response-code';
import { HttpPresenter } from '@interface-adapters/presenters/http-presenter';

describe('Http presenter tests.', () => {
  const callback = jest.fn();
  const sut = new HttpPresenter<any>(callback, HttpStatusCode.OK);

  it('should map a success response to the specified code.', () => {
    sut.success({ value: 1, prop: 2 });

    expect(callback).toBeCalledWith(
      new HttpResponse({
        body: { data: { value: 1, prop: 2 } },
        statusCode: HttpStatusCode.OK,
        headers: [],
      }),
    );
  });

  it('should map an invalid user input to status code 400.', () => {
    const error = new NullOrEmptyValueError('value');

    sut.failure(error);

    expect(callback).toBeCalledWith(
      new HttpResponse({
        body: {
          error: {
            message: error.message,
          },
        },
        statusCode: HttpStatusCode.BAD_REQUEST,
      }),
    );
  });

  it('should map an internal server error to status code 500.', () => {
    const error = new InternalError(new Error());

    sut.failure(error);

    expect(callback).toBeCalledWith(
      new HttpResponse({
        body: {
          error: {
            message: error.message,
          },
        },
        statusCode: HttpStatusCode.SERVER_ERROR,
      }),
    );
  });
});
