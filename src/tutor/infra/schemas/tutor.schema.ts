import { EntitySchema } from 'typeorm';

import { TutorModel } from '@tutor/domain/models';

export const TutorSchema = new EntitySchema<TutorModel>({
  name: 'TutorModel',
  tableName: 'tb_tutor',
  target: TutorModel,
  columns: {
    idUsuario: {
      type: 'uuid',
      name: 'id_usuario',
    },
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
      primaryKeyConstraintName: 'pk_tb_tutor',
      name: 'id',
    },
    dataInclusao: {
      name: 'data_inclusao',
      type: 'timestamp with time zone',
    },
  },
  relations: {
    usuario: {
      target: 'UsuarioModel',
      type: 'one-to-one',
      joinColumn: {
        name: 'id_usuario',
        foreignKeyConstraintName: 'fk_tb_tutor_tb_usuario',
        referencedColumnName: 'id',
      },
      cascade: true,
    },
  },
  uniques: [
    {
      name: 'uq_tb_tutor_id_usuario',
      columns: ['idUsuario'],
    },
  ],
});
