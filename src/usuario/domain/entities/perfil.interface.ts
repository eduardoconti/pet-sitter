import { PerfilUsuarioEnum } from '../enums';

export interface IPerfilUsuario {
  perfil(): PerfilUsuarioEnum;
  idPerfil(): number;
}
