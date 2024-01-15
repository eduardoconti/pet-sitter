import { EntitySchema } from 'typeorm';

import { CidadeModel, EstadoModel } from '@localizacao/domain/models';

export const CidadeSchema = new EntitySchema<CidadeModel>({
  name: 'CidadeModel',
  tableName: 'tb_cidade',
  target: CidadeModel,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
      primaryKeyConstraintName: 'pk_tb_cidade',
    },
    idEstado: {
      name: 'id_estado',
      type: Number,
    },
    nome: {
      type: String,
      name: 'nome',
      length: 256,
    },
    dataInclusao: {
      name: 'data_inclusao',
      type: 'timestamp with time zone',
    },
  },
  relations: {
    estado: {
      type: 'many-to-one',
      target: EstadoModel.name,
      joinColumn: {
        foreignKeyConstraintName: 'fk_tb_cidade_tb_estado',
        name: 'id_estado',
      },
      inverseSide: 'cidade',
    },
  },
});
