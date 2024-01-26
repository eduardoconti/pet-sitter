import { Inject, Injectable } from '@nestjs/common';
import { Usuario } from '@usuario/domain/entities';
import { IUsuarioRepository } from '@usuario/domain/repositories';
import { IAtivarCadastroUseCase } from '@usuario/domain/use-cases';
import { UsuarioRepository } from '@usuario/infra/repositories';

@Injectable()
export class AtivarCadastroUseCase implements IAtivarCadastroUseCase {
  constructor(
    @Inject(UsuarioRepository)
    private readonly usuarioRepository: IUsuarioRepository,
  ) {}

  async executar(idUsuario: string): Promise<void> {
    const usuario = await this.usuarioRepository.findById(idUsuario);
    const usuarioEntity = new Usuario(usuario);

    usuarioEntity.ativar();

    await this.usuarioRepository.update({
      id: idUsuario,
      status: usuarioEntity.status,
    });
  }
}
