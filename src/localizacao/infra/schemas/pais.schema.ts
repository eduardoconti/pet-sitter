import { EntitySchema } from 'typeorm';

import { EstadoModel, PaisModel } from '@localizacao/domain/models';

export const PaisSchema = new EntitySchema<PaisModel>({
  name: 'PaisModel',
  tableName: 'tb_pais',
  target: PaisModel,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
      primaryKeyConstraintName: 'pk_tb_pais',
    },
    nome: {
      type: String,
      name: 'nome',
      length: 256,
      unique: true,
    },
    dataInclusao: {
      name: 'data_inclusao',
      type: 'timestamp with time zone',
    },
  },
  relations: {
    estado: {
      type: 'one-to-many',
      target: EstadoModel.name,
      inverseSide: 'pais',
    },
  },
  uniques: [
    {
      columns: ['nome'],
      name: 'uq_tb_pais_nome',
    },
  ],
});
