import { Usuario } from '@usuario/domain/entities';
import { IUsuarioRepository } from '@usuario/domain/repositories';
import { IAtivarCadastroUseCase } from '@usuario/domain/use-cases';

export class AtivarCadastroUseCase implements IAtivarCadastroUseCase {
  constructor(private readonly usuarioRepository: IUsuarioRepository) {}

  async executar(idUsuario: string): Promise<string> {
    const usuario = await this.usuarioRepository.findById(idUsuario);
    const usuarioEntity = new Usuario(usuario);

    usuarioEntity.ativar();

    await this.usuarioRepository.update({
      id: idUsuario,
      status: usuarioEntity.status,
    });

    return `${usuarioEntity.nomeCompleto}, Obrigado por se cadastrar em nosso site!`;
  }
}
