import { UsuarioModel } from '@usuario/models';

export interface IUsuarioRepository {
  findByEmail(email: string): Promise<UsuarioModel>;
  update(model: Partial<UsuarioModel>): Promise<Partial<UsuarioModel>>;
  findById(id: string): Promise<UsuarioModel>;
}
