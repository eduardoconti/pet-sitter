import { UniqueEntityId } from './entity';

export abstract class BaseModel<T extends UniqueEntityId = string> {
  id!: T;
  dataInclusao!: Date | number | string;
}
