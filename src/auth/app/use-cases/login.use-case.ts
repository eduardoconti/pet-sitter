import { ILoginUseCase, LoginInput } from '@auth/domain/use-cases';
import { UnauthorizedException } from '@nestjs/common';

import { ICompareHash, IJWtService, TokenPayload } from '@core/contracts';

import { IUsuarioRepository } from '@usuario/domain/repositories';

import { UsuarioFactory } from '@factories/usuario';

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly usuarioRepository: IUsuarioRepository,
    private readonly compareHash: ICompareHash,
    private readonly jwtService: IJWtService,
  ) {}

  async executar({ email, senha }: LoginInput): Promise<string> {
    const model = await this.usuarioRepository.findByEmail(email);

    const usuario = UsuarioFactory.perfil(model);

    const compareHash = await this.compareHash.compare(senha, usuario.senha);

    if (!compareHash) {
      throw new UnauthorizedException('Credenciais invalidas');
    }

    return this.jwtService.sign<TokenPayload>({
      id: usuario.id,
      nome: usuario.nomeCompleto,
      email: usuario.email,
      perfil: usuario.perfil(),
      idPerfil: usuario.idPerfil(),
    });
  }
}
