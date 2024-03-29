import { PerfilUsuarioEnum } from '@usuario/domain/enums';

export type TokenPayload = {
  id: string;
  nome: string;
  email: string;
  perfil: PerfilUsuarioEnum;
  idPerfil: number;
};

export interface ISign {
  sign<T extends object>(payload: T): string;
}

export interface IVerify {
  verify(token: string): boolean;
}

export interface IDecode {
  decode<T extends object>(token: string): T;
}
export interface IJWtService extends ISign, IVerify, IDecode {}
