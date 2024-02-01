import { UsuarioModel } from '@usuario/models';

import { PetSitterModel } from '../models';

export type UpdatePetSitterInput = Partial<
  Omit<PetSitterModel, 'usuario' | 'id'> & {
    usuario: Partial<UsuarioModel>;
  }
> & { id: number };
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
  update(model: UpdatePetSitterInput): Promise<UpdatePetSitterInput>;
}
