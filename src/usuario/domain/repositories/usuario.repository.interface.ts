import { UsuarioModel } from '@usuario/models';

export interface IUsuarioRepository {
  findByEmail(email: string): Promise<UsuarioModel>;
}
