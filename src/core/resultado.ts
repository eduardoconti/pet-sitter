export type ResultadoProps<T> = {
  isSuccess: boolean;
  isFailure: boolean;
  error: T | string;
  value: T | string;
};

export class Resultado<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error?: T | string;
  private _value?: T;

  private constructor(isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error('Operacao invalida: Nao pode ser sucesso e conter erro!');
    }

    if (!isSuccess && !error) {
      throw new Error('Operacao invalida: Uma falha precisar conter o erro!');
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  get valor(): Partial<ResultadoProps<T>> {
    if (!this.isSuccess) {
      return { error: this.error as T, isFailure: true };
    }

    return { value: this._value, isSuccess: true };
  }

  public static ok<U>(value: U): Resultado<U> {
    return new Resultado<U>(true, undefined, value);
  }

  public static fail<U>(error: any): Resultado<U> {
    return new Resultado<U>(false, error);
  }
}
