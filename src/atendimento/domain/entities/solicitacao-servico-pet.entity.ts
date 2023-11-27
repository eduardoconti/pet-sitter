import { Centavos } from '@core/contracts';
import { Entity } from '@core/entity';
import { UUID } from '@core/uuid.value-object';
import { PetSitter } from '@pet-sitter/domain/entities';
import { PetEntity } from '@pet/domain/entities';
import { Servico } from '@servico/domain/entities';

import { DiaAtendimento } from '../value-objects';

export abstract class SolicitacaoServicoPet extends Entity {
  protected _servico!: Servico;
  private _pet!: PetEntity;
  private _idAtendimento!: UUID;
  private _diasAtendimento!: DiaAtendimento[];

  protected constructor({
    id,
    diasAtendimento,
    servico,
    pet,
  }: {
    id: UUID;
    diasAtendimento: DiaAtendimento[];
    servico: Servico;
    pet: PetEntity;
  }) {
    super({ id: id.value });
    this._diasAtendimento = diasAtendimento;
    this._servico = servico;
    this._pet = pet;
  }

  get servico(): Servico {
    return this._servico;
  }

  get pet(): PetEntity {
    return this._pet;
  }

  get idAgendamento(): UUID {
    return this._idAtendimento;
  }

  get diasAtendimento(): DiaAtendimento[] {
    return this._diasAtendimento;
  }

  abstract valorServico(petSitter?: PetSitter): Centavos;
}
