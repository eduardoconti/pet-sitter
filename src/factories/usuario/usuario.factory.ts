import { InternalServerErrorException } from '@nestjs/common';

import { PetSitter } from '@pet-sitter/domain/entities';

import { Usuario } from '@usuario/domain/entities';
import { IPerfilUsuario } from '@usuario/domain/entities/perfil.interface';
import { UsuarioModel } from '@usuario/models';

import { Tutor } from '@tutor/domain/entities';

export class UsuarioFacatory {
  static perfil(usuarioModel: UsuarioModel): Usuario & IPerfilUsuario {
    if (usuarioModel.petSitter) {
      return new PetSitter(usuarioModel);
    }

    if (usuarioModel.tutor) {
      return new Tutor(usuarioModel);
    }

    throw new InternalServerErrorException('Usuario sem perfil');
  }
}
