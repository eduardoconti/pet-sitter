import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { TokenPayload } from '@core/contracts';
import { PerfilUsuarioEnum } from '@usuario/domain/enums';

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user: TokenPayload }>();
    return request['user'];
  },
);

export const PetSitter = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user: TokenPayload }>();

    if (request.user.perfil !== PerfilUsuarioEnum.PET_SITTER) {
      throw new UnauthorizedException('Perfil invalido');
    }
    return request['user'];
  },
);

export const Tutor = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user: TokenPayload }>();

    if (request.user.perfil !== PerfilUsuarioEnum.TUTOR) {
      throw new UnauthorizedException('Perfil invalido');
    }
    return request['user'];
  },
);
