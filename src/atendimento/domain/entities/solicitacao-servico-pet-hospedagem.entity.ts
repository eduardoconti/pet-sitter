import { Centavos } from '@core/contracts';
import { UUID } from '@core/uuid.value-object';
import { Periodo } from '@core/value-objects';
import { PetEntity } from '@pet/domain/entities';
import { Hospedagem } from '@servico/domain/entities';

import { SolicitacaoServicoPet } from './solicitacao-servico-pet.entity';

export class SolicitacaoHospedagem extends SolicitacaoServicoPet {
  protected _servico!: Hospedagem;

  constructor({
    id,
    periodos,
    servico,
    pet,
  }: {
    id: UUID;
    periodos: Periodo[];
    servico: Hospedagem;
    pet: PetEntity;
  }) {
    super({
      id,
      periodos,
      servico,
      pet,
    });
  }

  static create({
    periodos,
    servico,
    pet,
  }: {
    periodos: Periodo[];
    servico: Hospedagem;
    pet: PetEntity;
  }) {
    if (periodos.length > 1) {
      throw new Error('Hospedagem permite apenas um periodo');
    }
    return new SolicitacaoHospedagem({
      id: UUID.generate(),
      periodos,
      servico,
      pet,
    });
  }

  valorServico(): Centavos {
    const frequencia = this.periodos.length;

    return this.servico.valor() * frequencia;
  }
}
