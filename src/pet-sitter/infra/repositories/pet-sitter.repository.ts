import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PetSitterModel } from '@pet-sitter/domain/models';
import { IPetSitterRepository } from '@pet-sitter/domain/repositories';

import { PostgresEnumErro } from '@infra/pg/enum';

import { PetSitterSchema } from '../schemas';

export class PetSitterRepository implements IPetSitterRepository {
  constructor(
    @InjectRepository(PetSitterSchema)
    private readonly petRepository: Repository<PetSitterModel>,
  ) {}

  async save(
    model: Omit<PetSitterModel, 'dataInclusao'>,
  ): Promise<PetSitterModel> {
    return await this.petRepository
      .save({
        ...model,
        dataInclusao: new Date().toISOString(),
      })
      .catch((error: any) => {
        if (error.code === PostgresEnumErro.unique_key_violation) {
          throw new BadRequestException('Email ja cadastrdo');
        }
        throw error;
      });
  }

  async get(idUsuario: string): Promise<PetSitterModel> {
    const petSitterModel = await this.petRepository.find({
      where: { idUsuario },
      select: {
        id: true,
        usuario: {
          id: true,
        },
      },
    });
    if (!petSitterModel || !petSitterModel.length) {
      throw new NotFoundException('Pet sitter nao encontrado');
    }
    return petSitterModel[0];
  }
}
