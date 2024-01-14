import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { JwtService } from '@infra/jwt';

import { IJWtService, TokenPayload } from '@core/contracts';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(JwtService)
    private readonly jwtService: IJWtService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request & { user: TokenPayload }>();
    const authorizationHeader = request.headers['authorization'] as string;

    if (!authorizationHeader) {
      throw new UnauthorizedException('Token nao encontrado');
    }

    const token = this.extrairToken(authorizationHeader);

    if (!this.jwtService.verify(token)) {
      throw new UnauthorizedException('Token invalido');
    }

    request['user'] = this.jwtService.decode(token);
    return true;
  }

  private extrairToken(header: string): string {
    const match = header.match(/Bearer\s+(\S+)/);

    if (match) {
      return match[1];
    }

    throw new UnauthorizedException('Token invalido');
  }
}
