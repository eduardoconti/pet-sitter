type UniqueEntityId = string | number;

export abstract class Entity<T extends UniqueEntityId = string> {
  constructor({ id }: { id: T }) {
    this.setId(id);
  }

  protected _id!: T;

  setId(id: T) {
    this._id = id;
  }

  get id(): T {
    return this._id;
  }
}
