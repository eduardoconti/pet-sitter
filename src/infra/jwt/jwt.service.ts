import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';

import { EnvironmentVariables } from '@main/config';

import { IDecode, ISign, IVerify } from '@core/contracts';

const EXPIRATION = '1d';

@Injectable()
export class JwtService implements ISign, IVerify, IDecode {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}
  sign<T extends object>(payload: T) {
    const SECRET = this.configService.getOrThrow('JWT_SECRET');
    return jwt.sign(payload, SECRET, {
      expiresIn: EXPIRATION,
    });
  }

  verify(token: string): boolean {
    const SECRET = process.env.JWT_SECRET as string;
    try {
      jwt.verify(token, SECRET, {
        ignoreExpiration: false,
      });
    } catch (error) {
      return false;
    }
    return true;
  }

  decode<T extends object>(token: string): T {
    return jwt.decode(token, { json: true }) as T;
  }
}
