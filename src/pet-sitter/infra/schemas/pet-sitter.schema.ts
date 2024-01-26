import { EntitySchema } from 'typeorm';

import { PetSitterModel } from '@pet-sitter/domain/models';
export const PetSitterSchema = new EntitySchema<PetSitterModel>({
  name: 'PetSitterModel',
  tableName: 'tb_pet_sitter',
  target: PetSitterModel,
  columns: {
    idUsuario: {
      type: 'uuid',
      name: 'id_usuario',
    },
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
      primaryKeyConstraintName: 'pk_tb_pet_sitter',
      name: 'id',
    },
    bio: {
      name: 'bio',
      type: 'text',
      nullable: true,
    },
    dataInclusao: {
      name: 'data_inclusao',
      type: 'timestamp with time zone',
    },
  },
  relations: {
    localAtendimento: {
      type: 'one-to-many',
      target: 'LocalAtendimentoModel',
      inverseSide: 'petSitter',
    },
    usuario: {
      target: 'UsuarioModel',
      type: 'one-to-one',
      joinColumn: {
        name: 'id_usuario',
        foreignKeyConstraintName: 'fk_tb_pet_sitter_tb_usuario',
        referencedColumnName: 'id',
      },
      cascade: true,
    },
    servicos: {
      type: 'one-to-many',
      target: 'ServicoModel',
      inverseSide: 'petSitter',
    },
    avaliacoes: {
      type: 'one-to-many',
      target: 'AvaliacaoModel',
      inverseSide: 'petSitter',
    },
  },
  uniques: [
    {
      name: 'uq_tb_pet_sitter_id_usuario',
      columns: ['idUsuario'],
    },
  ],
});
