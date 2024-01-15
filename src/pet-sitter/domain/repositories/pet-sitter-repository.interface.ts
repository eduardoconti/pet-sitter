import { UsuarioModel } from '@usuario/models';

import { PetSitterModel } from '../models';

export interface IPetSitterRepository {
  save(
    model: Omit<
      PetSitterModel,
      'dataInclusao' | 'id' | 'usuario' | 'idUsuario'
    > & {
      usuario: Omit<UsuarioModel, 'id'>;
    },
  ): Promise<PetSitterModel>;

  get(idUsuario: string): Promise<PetSitterModel>;
}
