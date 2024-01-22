import { EntitySchema } from 'typeorm';

import { UsuarioModel } from '@usuario/models';

export const UsuarioSchema = new EntitySchema<UsuarioModel>({
  name: 'UsuarioModel',
  tableName: 'tb_usuario',
  target: UsuarioModel,
  columns: {
    id: {
      name: 'id',
      type: 'uuid',
      primary: true,
      primaryKeyConstraintName: 'pk_tb_usuario',
      default: () => 'uuid_generate_v4()',
    },
    nome: {
      type: String,
      length: 128,
    },
    sobreNome: {
      name: 'sobrenome',
      type: String,
      length: 128,
      nullable: false,
    },
    email: {
      type: String,
      length: 256,
    },
    senha: {
      type: String,
      length: 128,
    },
    status: {
      name: 'status',
      type: 'char',
      default: 'P',
    },
    dataNascimento: {
      name: 'data_nascimento',
      type: 'timestamp with time zone',
    },
    dataInclusao: {
      name: 'data_inclusao',
      type: 'timestamp with time zone',
    },
  },
  checks: [
    {
      name: 'ck_tb_usuario_status',
      expression: "\"status\" IN ('A', 'S', 'P')",
    },
  ],
  uniques: [
    {
      columns: ['email'],
      name: 'uq_tb_usuario_email',
    },
  ],
  indices: [
    {
      name: 'idx_tb_usuario_status',
      columns: ['status'],
    },
  ],
});
