import { EntitySchema } from 'typeorm';

import { ServicoModel } from '@servico/domain/models';

export const ServicoSchema = new EntitySchema<ServicoModel>({
  name: 'ServicoModel',
  tableName: 'tb_servico',
  target: ServicoModel,
  columns: {
    id: {
      name: 'id',
      primary: true,
      type: Number,
      generated: 'increment',
      primaryKeyConstraintName: 'pk_tb_servico',
    },
    tipoServico: {
      name: 'tipo_servico',
      type: 'char',
    },
    idPetSitter: {
      name: 'id_pet_sitter',
      type: Number,
    },
    dataInclusao: {
      name: 'data_inclusao',
      type: 'timestamp with time zone',
    },
  },
  relations: {
    petSitter: {
      type: 'many-to-one',
      target: 'PetSitterModel',
      joinColumn: {
        foreignKeyConstraintName: 'fk_tb_servico_tb_pet_sitter',
        name: 'id_pet_sitter',
      },
      inverseSide: 'servicos',
    },
  },
  uniques: [
    {
      columns: ['idPetSitter', 'tipoServico'],
      name: 'uq_tb_servico_id_pet_sitter_tipo_servico',
    },
  ],
  checks: [
    {
      name: 'ck_tb_servico_tipo',
      expression: "\"tipo_servico\" IN ('A', 'H', 'P')",
    },
  ],
});
