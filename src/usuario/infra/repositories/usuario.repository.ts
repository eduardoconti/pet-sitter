import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUsuarioRepository } from '@usuario/domain/repositories';
import { UsuarioModel } from '@usuario/models';

import { UsuarioSchema } from '../schemas';

export class UsuarioRepository implements IUsuarioRepository {
  constructor(
    @InjectRepository(UsuarioSchema)
    private readonly repository: Repository<UsuarioModel>,
  ) {}
  async findByEmail(email: string): Promise<UsuarioModel> {
    const user = await this.repository.find({
      where: { email },
      relations: { petSitter: true, tutor: true },
    });

    if (!user || !user.length) {
      throw new NotFoundException('Usuario nao encontrado');
    }

    return user[0];
  }

  async update(model: Partial<UsuarioModel>): Promise<Partial<UsuarioModel>> {
    const { id, ...rest } = model;
    await this.repository.update({ id }, rest);
    return model;
  }

  async findById(id: string): Promise<UsuarioModel> {
    const user = await this.repository.find({ where: { id } });

    if (!user || !user.length) {
      throw new NotFoundException('Usuario nao encontrado');
    }

    return user[0];
  }
}
