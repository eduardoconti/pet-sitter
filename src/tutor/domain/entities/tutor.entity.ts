import { Usuario, IPerfilUsuario } from '@usuario/domain/entities';
import { PerfilUsuarioEnum } from '@usuario/domain/enums';

export class Tutor extends Usuario implements IPerfilUsuario {
  perfil(): PerfilUsuarioEnum {
    return PerfilUsuarioEnum.TUTOR;
  }
}
