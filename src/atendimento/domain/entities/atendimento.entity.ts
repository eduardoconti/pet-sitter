import { Centavos } from '@core/contracts';
import { Entity } from '@core/entity';
import { UUID } from '@core/uuid.value-object';
import { PetSitter } from '@pet-sitter/domain/entities';
import { Tutor } from '@tutor/domain/entities';

import { SolicitacaoServicoPet } from './solicitacao-servico-pet.entity';

type StatusAtendimento = 'NOVO' | 'ANDAMENTO';
export class Atendimento extends Entity {
  private _servicos!: SolicitacaoServicoPet[];
  private _tutor!: Tutor;
  private _petSitter!: PetSitter;
  private _status!: StatusAtendimento;

  private constructor({ id }: { id: UUID }) {
    super({ id: id.value });
  }

  get servicos(): SolicitacaoServicoPet[] {
    return this._servicos;
  }

  get tutor(): Tutor {
    return this._tutor;
  }

  get status(): StatusAtendimento {
    return this._status;
  }

  get petSitter(): PetSitter {
    return this._petSitter;
  }

  static novo() {
    return new Atendimento({ id: UUID.generate() });
  }

  setServicos(servicosPet: SolicitacaoServicoPet[]) {
    this._servicos = servicosPet;
  }

  setTutor(tutor: Tutor) {
    this._tutor = tutor;
  }

  setPetSitter(petSitter: PetSitter) {
    this._petSitter = petSitter;
  }

  valorAtendimento(): Centavos {
    if (!this.servicos || !this.servicos?.length) {
      throw new Error('Atendimento sem servicos');
    }

    if (!this.petSitter) {
      throw new Error('Pet sitter nao definido');
    }
    return this.servicos.reduce((acc, item) => {
      return (acc += item.valorServico(this.petSitter));
    }, 0);
  }
}
