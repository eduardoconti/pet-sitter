import { UniqueEntityId } from './entity';

export type BaseModel<T extends UniqueEntityId = string> = {
  id: T;
  dataInclusao: Date | number | string;
};
