import { EntitySchema } from 'typeorm';

import { AvaliacaoModel } from '@pet-sitter/domain/models/avaliacao.model';

export const AvaliacaoSchema = new EntitySchema<AvaliacaoModel>({
  name: 'AvaliacaoModel',
  tableName: 'tb_pet_sitter_avaliacao',
  target: AvaliacaoModel,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
      primaryKeyConstraintName: 'pk_tb_pet_sitter_avaliacao',
      name: 'id',
    },
    idPetSitter: {
      type: Number,
      name: 'id_pet_sitter',
    },
    idTutor: {
      type: Number,
      name: 'id_tutor',
    },
    rating: {
      type: 'decimal',
      name: 'rating',
      precision: 3,
      scale: 2,
    },
    descricao: {
      type: 'text',
      name: 'descricao',
      nullable: true,
    },
    dataInclusao: {
      name: 'data_inclusao',
      type: 'timestamp with time zone',
    },
  },
  relations: {
    petSitter: {
      target: 'PetSitterModel',
      type: 'many-to-one',
      joinColumn: {
        name: 'id_pet_sitter',
        foreignKeyConstraintName: 'fk_tb_pet_sitter_avaliacao_tb_pet_sitter',
        referencedColumnName: 'id',
      },
    },
    tutor: {
      target: 'TutorModel',
      type: 'many-to-one',
      joinColumn: {
        name: 'id_tutor',
        foreignKeyConstraintName: 'fk_tb_pet_sitter_avaliacao_tb_tutor',
        referencedColumnName: 'id',
      },
    },
  },
  indices: [
    {
      name: 'idx_tb_pet_sitter_avaliacao_id_pet_sitter',
      columns: ['idPetSitter'],
    },
  ],
  checks: [
    { name: 'ck_rating', expression: '("rating" >= 0 AND "rating" <= 3)' },
  ],
});
