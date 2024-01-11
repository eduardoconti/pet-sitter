import { BaseException } from '@core/base-exception';
import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ExceptionFilter,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { IdempotencyException } from './idempotency.exception';
@Catch(IdempotencyException)
export class IdempotencyExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus = this.getHTTPStatus(exception);

    httpAdapter.reply(ctx.getResponse(), undefined, httpStatus);
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
}
