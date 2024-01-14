import { UnauthorizedException } from '@nestjs/common';

import { ICompareHash, IJWtService, TokenPayload } from '@core/contracts';
import { IUseCase } from '@core/use-case.interface';

import { IUsuarioRepository } from '@usuario/domain/repositories';

type LoginInput = {
  email: string;
  senha: string;
};
export class LoginUseCase implements IUseCase<LoginInput, string> {
  constructor(
    private readonly usuarioRepository: IUsuarioRepository,
    private readonly compareHash: ICompareHash,
    private readonly jwtService: IJWtService,
  ) {}

  async executar({ email, senha }: LoginInput): Promise<string> {
    const {
      id,
      nome,
      senha: encrypted,
    } = await this.usuarioRepository.findByEmail(email);

    const compareHash = await this.compareHash.compare(senha, encrypted);

    if (!compareHash) {
      throw new UnauthorizedException('Credenciais invalidas');
    }

    return this.jwtService.sign<TokenPayload>({
      id: id,
      nome: nome,
      email: email,
    });
  }
}
