import { EntitySchema } from 'typeorm';

import { TipoServicoEnum } from '@servico/domain/enums';
import { HospedagemModel } from '@servico/domain/models';

export const HospedagemSchema = new EntitySchema<HospedagemModel>({
  name: 'HospedagemModel',
  tableName: 'tb_hospedagem',
  target: HospedagemModel,
  columns: {
    id: {
      name: 'id',
      primary: true,
      type: Number,
      generated: 'increment',
      primaryKeyConstraintName: 'pk_tb_hospedagem',
    },
    tipoServico: {
      name: 'tipo_servico',
      type: 'enum',
      enum: TipoServicoEnum,
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
        foreignKeyConstraintName: 'fk_tb_hospedagem_tb_pet_sitter',
        name: 'id_pet_sitter',
      },
      inverseSide: 'servicoHospedagem',
    },
  },
  uniques: [
    {
      columns: ['idPetSitter'],
      name: 'uq_tb_hospedagem_id_pet_sitter',
    },
  ],
  checks: [
    {
      name: 'ck_tb_hospedagem',
      expression: '"tipo_servico" = \'H\'',
    },
  ],
});
