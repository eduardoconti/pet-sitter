import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PetSitterModel } from '@pet-sitter/domain/models';
import {
  IPetSitterRepository,
  UpdatePetSitterInput,
} from '@pet-sitter/domain/repositories';

import { PostgresEnumErro } from '@infra/pg/enum';

import { PetSitterSchema } from '../schemas';

export class PetSitterRepository implements IPetSitterRepository {
  constructor(
    @InjectRepository(PetSitterSchema)
    private readonly petSitterRepository: Repository<PetSitterModel>,
  ) {}

  async save(
    model: Omit<PetSitterModel, 'dataInclusao'>,
  ): Promise<PetSitterModel> {
    return await this.petSitterRepository
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
    const petSitterModel = await this.petSitterRepository.find({
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

  async update(model: UpdatePetSitterInput): Promise<UpdatePetSitterInput> {
    const { id, ...petSitter } = model;

    await this.petSitterRepository.save({ ...petSitter, id });

    return model;
  }
}
