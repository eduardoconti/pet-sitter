import { EntitySchema } from 'typeorm';

import { StatusAtendimentoEnum } from '@atendimento/domain/enums';
import { AtendimentoModel } from '@atendimento/domain/models/atendimento.model';
export const AtendimentoSchema = new EntitySchema<AtendimentoModel>({
  name: 'AtendimentoModel',
  tableName: 'tb_atendimento',
  target: AtendimentoModel,
  columns: {
    id: {
      name: 'id',
      type: 'uuid',
      primary: true,
      primaryKeyConstraintName: 'pk_tb_atendimento',
      default: () => 'uuid_generate_v4()',
    },
    idPetSitter: {
      type: 'uuid',
      name: 'id_pet_sitter',
      nullable: true,
    },
    idTutor: {
      type: 'uuid',
      name: 'id_tutor',
      nullable: true,
    },
    status: {
      type: 'enum',
      enum: StatusAtendimentoEnum,
    },
    dataInclusao: {
      name: 'data_inclusao',
      type: 'timestamp with time zone',
    },
  },
});
