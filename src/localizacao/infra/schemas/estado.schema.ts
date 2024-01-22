import { EntitySchema } from 'typeorm';

import {
  CidadeModel,
  EstadoModel,
  PaisModel,
} from '@localizacao/domain/models';

export const EstadoSchema = new EntitySchema<EstadoModel>({
  name: 'EstadoModel',
  tableName: 'tb_estado',
  target: EstadoModel,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
      primaryKeyConstraintName: 'pk_tb_estado',
    },
    idPais: {
      name: 'id_pais',
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
    pais: {
      type: 'many-to-one',
      target: PaisModel.name,
      joinColumn: {
        foreignKeyConstraintName: 'fk_tb_estado_tb_pais',
        name: 'id_pais',
      },
      inverseSide: 'estado',
    },
    cidade: {
      type: 'one-to-many',
      target: CidadeModel.name,
      inverseSide: 'estado',
    },
  },
  uniques: [
    {
      columns: ['nome'],
      name: 'uq_tb_estado_nome',
    },
  ],
  indices: [
    {
      name: 'idx_tb_estado_tb_pais',
      columns: ['idPais'],
    },
  ],
});
