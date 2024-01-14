import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUsuarioRepository } from '@usuario/domain/repositories';
import { UsuarioModel } from '@usuario/models';

import { UsuarioSchema } from '../schemas/usuario.schema';

export class UsuarioRepository implements IUsuarioRepository {
  constructor(
    @InjectRepository(UsuarioSchema)
    private readonly repository: Repository<UsuarioModel>,
  ) {}
  async findByEmail(email: string): Promise<UsuarioModel> {
    const user = await this.repository.find({ where: { email } });

    if (!user || !user.length) {
      throw new NotFoundException('Usuario nao encontrado');
    }

    return user[0];
  }
}
