import { BaseException, httpStatusMessages } from '@core/base-exception';
import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ExceptionFilter,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    console.log(exception);
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus = this.getHTTPStatus(exception);

    const responseBody = {
      status: httpStatus,
      title: this.getTitle(exception),
      detail: this.getDetail(exception),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private getHTTPStatus(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    if (exception instanceof BaseException) {
      return exception.statusHttp();
    }
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    return httpStatus;
  }

  private getDetail(exception: unknown): string | undefined {
    if (exception instanceof HttpException) {
      return HttpException.getDescriptionFrom(exception);
    }

    if (exception instanceof BaseException) {
      return exception.message;
    }
  }

  private getTitle(exception: unknown): string {
    if (exception instanceof HttpException) {
      return httpStatusMessages[exception.getStatus()];
    }

    if (exception instanceof BaseException) {
      return exception.title();
    }

    return httpStatusMessages[HttpStatus.INTERNAL_SERVER_ERROR];
  }
}
