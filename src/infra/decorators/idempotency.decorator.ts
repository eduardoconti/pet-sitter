import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const IdempotencyKey = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.headers['x-idempotency-key'];
  },
);
