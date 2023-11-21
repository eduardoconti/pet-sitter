import { Centavos } from '@core/contracts';
import { Entity } from '@core/entity';
import { UUID } from '@core/uuid.value-object';
import { Pessoa } from '@pessoa/domain/entities';

import { ServicoPet } from './servico-pet.entity';

type StatusAtendimento = 'NOVO' | 'ANDAMENTO';
export class Atendimento extends Entity {
  private _servicos!: ServicoPet[];
  private _tutor!: Pessoa;
  private _status!: StatusAtendimento;

  private constructor({ id }: { id: UUID }) {
    super({ id: id.value });
  }

  get servicos(): ServicoPet[] {
    return this._servicos;
  }

  get tutor(): Pessoa {
    return this._tutor;
  }

  get status(): StatusAtendimento {
    return this._status;
  }

  static novo() {
    return new Atendimento({ id: UUID.generate() });
  }

  setServicos(servicosPet: ServicoPet[]) {
    this._servicos = servicosPet;
  }

  setTutor(tutor: Pessoa) {
    this._tutor = tutor;
  }

  valorAtendimento(): Centavos {
    return this.servicos.reduce((acc, item) => {
      return (acc += item.valorServico());
    }, 0);
  }
}
