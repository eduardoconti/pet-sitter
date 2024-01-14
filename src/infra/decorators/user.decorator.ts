import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { TokenPayload } from '@core/contracts';

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user: TokenPayload }>();
    return request['user'];
  },
);
