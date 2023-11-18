import { StringUtil } from '@core/utils';
import { ValueObject } from '@core/value-object';

import { NomePetException } from '../exceptions';

interface NomePetProps {
  value: string;
}

export class NomePet extends ValueObject<NomePetProps> {
  private constructor(props: NomePetProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
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
