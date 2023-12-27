import { Centavos } from '@core/contracts';
import { Entity } from '@core/entity';
import { UUID } from '@core/uuid.value-object';
import { Periodo } from '@core/value-objects';
import { PetSitter } from '@pet-sitter/domain/entities';
import { PetEntity } from '@pet/domain/entities';
import { Servico } from '@servico/domain/entities';

export abstract class SolicitacaoServicoPet extends Entity {
  protected _servico!: Servico;
  protected _periodos!: Periodo[];
  private _pet!: PetEntity;
  private _idAtendimento!: UUID;

  protected constructor({
    id,
    periodos,
    servico,
    pet,
  }: {
    id?: UUID;
    periodos: Periodo[];
    servico: Servico;
    pet: PetEntity;
  }) {
    super({ id: id?.value });

    if (!periodos.length) {
      throw new Error('Necessario ao menos um periodo');
    }
    this._periodos = periodos;
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

  get periodos(): Periodo[] {
    return this._periodos;
  }

  abstract valorServico(petSitter?: PetSitter): Centavos;
}
