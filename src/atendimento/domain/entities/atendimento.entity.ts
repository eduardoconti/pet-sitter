import { Centavos } from '@core/contracts';
import { Entity } from '@core/entity';
import { UUID } from '@core/uuid.value-object';
import { PetSitter } from '@pet-sitter/domain/entities';
import { Tutor } from '@tutor/domain/entities';

import { StatusAtendimentoEnum } from '../enums';
import { SolicitacaoServicoPet } from './solicitacao-servico-pet.entity';

export class Atendimento extends Entity {
  private _servicos!: SolicitacaoServicoPet[];
  private _tutor!: Tutor;
  private _petSitter!: PetSitter;
  private _status!: StatusAtendimentoEnum;

  private constructor({
    status,
    id,
  }: {
    id?: UUID;
    status: StatusAtendimentoEnum;
  }) {
    super({ id: id?.value });
    this._status = status;
  }

  get servicos(): SolicitacaoServicoPet[] {
    return this._servicos;
  }

  get tutor(): Tutor {
    return this._tutor;
  }

  get status(): StatusAtendimentoEnum {
    return this._status;
  }

  get petSitter(): PetSitter {
    return this._petSitter;
  }

  static novo() {
    return new Atendimento({
      id: UUID.generate(),
      status: StatusAtendimentoEnum.NOVO,
    });
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

    return this.servicos.reduce((valor, solicitacaoServicoPet) => {
      return (valor += solicitacaoServicoPet.valorServico(this.petSitter));
    }, 0);
  }
}
