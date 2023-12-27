export type UniqueEntityId = string | number;

export abstract class Entity<T extends UniqueEntityId = string> {
  protected _id!: T;
  constructor({ id }: { id?: T }) {
    this.setId(id);
  }

  get id(): T {
    return this._id;
  }

  setId(id?: T) {
    this._id = id as T;
  }
}
