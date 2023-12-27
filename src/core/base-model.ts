import { UniqueEntityId } from './entity';

export class BaseModel<T extends UniqueEntityId = string> {
  id!: T;
  dataInclusao!: Date | number | string;
}
