import { EntitySchema } from 'typeorm';

import { LocalAtendimentoModel } from '@pet-sitter/domain/models';
export const LocalAtendimento = new EntitySchema<LocalAtendimentoModel>({
  name: 'LocalAtendimentoModel',
  tableName: 'tb_local_atendimento',
  target: LocalAtendimentoModel,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
      primaryKeyConstraintName: 'pk_tb_local_atendimento',
    },
    idPetSitter: {
      type: Number,
      name: 'id_pet_sitter',
    },
    idRegiao: {
      type: String,
      length: 128,
    },
    raioAtendimento: {
      type: Number,
      name: 'raio_atendimento',
      nullable: true,
    },
    dataInclusao: {
      name: 'data_inclusao',
      type: 'timestamp with time zone',
    },
  },
  relations: {
    idPetSitter: {
      type: 'many-to-one',
      target: 'PetSitterModel',
      joinColumn: {
        foreignKeyConstraintName: 'fk_tb_usuario_tb_pet_sitter',
        name: 'id_pet_sitter',
      },
    },
  },
});