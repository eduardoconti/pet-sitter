import { EntitySchema } from 'typeorm';

import { IdempotencyModel } from './idempotency.model';

export const IdempotencySchema = new EntitySchema<IdempotencyModel>({
  name: 'IdempotencyModel',
  tableName: 'tb_idempotency',
  target: IdempotencyModel,
  columns: {
    id: {
      name: 'id',
      type: 'uuid',
      primary: true,
      primaryKeyConstraintName: 'pk_tb_idempotency',
    },
    dataInclusao: {
      name: 'data_inclusao',
      type: 'timestamp with time zone',
    },
  },
});
