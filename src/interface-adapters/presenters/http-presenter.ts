import { NullOrEmptyValueError } from '@common/errors/null-or-empty-value';
import { HttpResponse } from '@interface-adapters/http/http-response';
import { HttpStatusCode } from '@interface-adapters/http/http-response-code';
import { UseCaseOutputPort } from '@use-cases/ports/usecase-output-port';

export class HttpPresenter<T> implements UseCaseOutputPort<T> {
  constructor(
    private readonly callback: (response: HttpResponse) => void,
    private readonly successHttpCode: HttpStatusCode,
  ) {}

  success(response: T): void {
    const httpResponse = new HttpResponse({
      body: {
        data: response,
      },
      statusCode: this.successHttpCode,
    });

    return this.callback(httpResponse);
  }

  failure(error: Error): void {
    const httpResponse = new HttpResponse({
      body: {
        error: {
          message: error.message,
        },
      },
      statusCode: this.getErrorHttpStatusCode(error),
    });

    this.callback(httpResponse);
  }

  private getErrorHttpStatusCode(error: Error): HttpStatusCode {
    switch (true) {
      case error instanceof NullOrEmptyValueError:
        return HttpStatusCode.BAD_REQUEST;
      default:
        return HttpStatusCode.SERVER_ERROR;
    }
  }
}
