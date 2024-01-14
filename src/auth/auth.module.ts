import { Module } from '@nestjs/common';

import { PasswordService } from '@infra/bcrypt';
import { PasswordModule } from '@infra/bcrypt/password.module';
import { JwtService } from '@infra/jwt';

import { ICompareHash, IJWtService } from '@core/contracts';

import { IUsuarioRepository } from '@usuario/domain/repositories';
import { UsuarioRepository } from '@usuario/infra/repositories';
import { UsuarioModule } from '@usuario/usuario.module';

import { LoginUseCase } from './app/use-cases/login.use-case';
import { AuthGuard } from './guard/auth.guard';
import { LoginController } from './presentation/login.controller';

@Module({
  controllers: [LoginController],
  imports: [UsuarioModule, PasswordModule],
  providers: [
    {
      provide: LoginUseCase,
      useFactory(
        repo: IUsuarioRepository,
        hash: ICompareHash,
        jwt: IJWtService,
      ) {
        return new LoginUseCase(repo, hash, jwt);
      },
      inject: [UsuarioRepository, PasswordService, JwtService],
    },
    AuthGuard,
    JwtService,
  ],
  exports: [AuthGuard, JwtService],
})
export class AuthModule {}
