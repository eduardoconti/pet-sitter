import { ValueObject } from '@core/value-object';
import { NomePetException } from '../exceptions';
import { StringUtil } from '@core/utils';

interface NomePetProps {
  value: string;
}

export class NomePet extends ValueObject<NomePetProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: NomePetProps) {
    super(props);
  }

  static create(nome: string): NomePet {
    if (!StringUtil.isString(nome)) {
      throw NomePetException.nomeInvalido();
    }

    nome = StringUtil.removeEspacosEmBranco(nome);

    if (nome.length < 2 || nome.length > 128) {
      throw NomePetException.rangeInvalido();
    }

    return new NomePet({ value: formataNome(nome) });
  }
}

function formataNome(nome: string) {
  return StringUtil.primeiraLetraMaiusculaCadaNome(nome);
}
