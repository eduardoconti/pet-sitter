import { UUID } from '@core/uuid.value-object';
import { Periodo } from '@core/value-objects';
import { Data } from '@core/value-objects/data.value-object';
import { PetSitter } from '@pet-sitter/domain/entities';
import { PetEntity } from '@pet/domain/entities';
import { TemperamentoPetEnum } from '@pet/domain/enums';
import { Alimentacao, Passeio } from '@servico/domain/entities';

import { DiaAtendimento } from '../value-objects';
import { Atendimento } from './atendimento.entity';
import { SolicitacaoAlimentacao } from './solicitacao-servico-pet-alimentacao.entity';
import { SolicitacaoPasseio } from './solicitacao-servico-pet-passeio.entity';

describe('Atendimento', () => {
  const passeio = Passeio.create({
    idPetSitter: UUID.generate(),
    tempoMaximo: 6 * 60 * 60,
    valorPorHora: 25 * 100,
  });

  const alimentacao = Alimentacao.create({
    idPetSitter: UUID.generate(),
    frequenciaMaxima: 6,
    valorPorVisita: 50 * 100,
  });

  const pet = PetEntity.create({
    nome: 'Gus',
    temperamento: TemperamentoPetEnum.DOCIL,
  });

  const petSitter = PetSitter.fromModel({
    id: UUID.generate().value,
    dataNascimento: new Date(),
    dataInclusao: new Date(),
    nome: ' asdf',
    contato: {
      id: UUID.generate().value,
      email: '',
      telefone: '',
      dataInclusao: new Date(),
    },
  });

  it('deve iniciar um antedimento', () => {
    const atendimento = Atendimento.novo();
    expect(atendimento).toEqual({
      _id: expect.any(String),
    });
  });

  describe('valor atendimento passeio', () => {
    const atendimento = Atendimento.novo();
    atendimento.setPetSitter(petSitter);
    it('deve calcular o valor de um antedimento com 1 periodo', () => {
      const servicoPetPasseio = SolicitacaoPasseio.create({
        pet,
        servico: passeio,
        diasAtendimento: [
          DiaAtendimento.create({
            dia: Data.create('2023-01-01'),
            periodos: [
              Periodo.create({
                inicio: new Date('2023-01-01T00:00:00'),
                fim: new Date('2023-01-01T06:00:00'),
              }),
            ],
          }),
        ],
      });

      atendimento.setServicos([servicoPetPasseio]);
      expect(atendimento.valorAtendimento()).toBe(25 * 100 * 6);
    });
    it('deve calcular o valor de um antedimento com 2 periodos', () => {
      const servicoPetPasseio = SolicitacaoPasseio.create({
        pet,
        servico: passeio,
        diasAtendimento: [
          DiaAtendimento.create({
            dia: Data.create('2023-01-01'),
            periodos: [
              Periodo.create({
                inicio: new Date('2023-01-01T00:00:00'),
                fim: new Date('2023-01-01T06:00:00'),
              }),
              Periodo.create({
                inicio: new Date('2023-01-01T06:00:00'),
                fim: new Date('2023-01-01T10:00:00'),
              }),
            ],
          }),
        ],
      });
      atendimento.setServicos([servicoPetPasseio]);
      expect(atendimento.valorAtendimento()).toBe(25 * 100 * 10);
    });
  });

  describe('valor atendimento alimentacao', () => {
    const atendimento = Atendimento.novo();
    atendimento.setPetSitter(petSitter);
    it('deve calcular o valor de um antedimento com 1 visita', () => {
      const servicoPetAlimentacao = SolicitacaoAlimentacao.create({
        pet,
        servico: alimentacao,
        diasAtendimento: [
          DiaAtendimento.create({
            dia: Data.create('2023-01-01'),
            periodos: [
              Periodo.create({
                inicio: new Date('2023-01-01T00:00:00'),
                fim: new Date('2023-01-01T00:00:00'),
              }),
            ],
          }),
        ],
      });

      atendimento.setServicos([servicoPetAlimentacao]);
      expect(atendimento.valorAtendimento()).toBe(50 * 100 * 1);
    });
    it('deve calcular o valor de um antedimento com 2 visitas', () => {
      const servicoPetAlimentacao = SolicitacaoAlimentacao.create({
        pet,
        servico: alimentacao,
        diasAtendimento: [
          DiaAtendimento.create({
            dia: Data.create('2023-01-01'),
            periodos: [
              Periodo.create({
                inicio: new Date('2023-01-01T00:00:00'),
                fim: new Date('2023-01-01T00:00:00'),
              }),
              Periodo.create({
                inicio: new Date('2023-01-01T00:00:00'),
                fim: new Date('2023-01-01T10:00:00'),
              }),
            ],
          }),
        ],
      });

      atendimento.setServicos([servicoPetAlimentacao]);
      expect(atendimento.valorAtendimento()).toBe(50 * 100 * 2);
    });
  });

  describe('valor atendimento alimentacao e passeio', () => {
    const atendimento = Atendimento.novo();
    atendimento.setPetSitter(petSitter);
    it('deve calcular o valor de um antedimento com 1 visita', () => {
      const servicoPetAlimentacao = SolicitacaoAlimentacao.create({
        pet,
        servico: alimentacao,
        diasAtendimento: [
          DiaAtendimento.create({
            dia: Data.create('2023-01-01'),
            periodos: [
              Periodo.create({
                inicio: new Date('2023-01-01T00:00:00'),
                fim: new Date('2023-01-01T00:00:00'),
              }),
            ],
          }),
        ],
      });

      const servicoPetPasseio = SolicitacaoPasseio.create({
        pet,
        servico: passeio,
        diasAtendimento: [
          DiaAtendimento.create({
            dia: Data.create('2023-01-01'),
            periodos: [
              Periodo.create({
                inicio: new Date('2023-01-01T00:00:00'),
                fim: new Date('2023-01-01T06:00:00'),
              }),
            ],
          }),
        ],
      });
      atendimento.setServicos([servicoPetAlimentacao, servicoPetPasseio]);
      expect(atendimento.valorAtendimento()).toBe(50 * 100 * 1 + 25 * 100 * 6);
    });
    it('deve calcular o valor de um antedimento com 2 visitas', () => {
      const servicoPetAlimentacao = SolicitacaoAlimentacao.create({
        pet,
        servico: alimentacao,
        diasAtendimento: [
          DiaAtendimento.create({
            dia: Data.create('2023-01-01'),
            periodos: [
              Periodo.create({
                inicio: new Date('2023-01-01T00:00:00'),
                fim: new Date('2023-01-01T00:00:00'),
              }),
              Periodo.create({
                inicio: new Date('2023-01-01T00:00:00'),
                fim: new Date('2023-01-01T10:00:00'),
              }),
            ],
          }),
        ],
      });

      const servicoPetPasseio = SolicitacaoPasseio.create({
        pet,
        servico: passeio,
        diasAtendimento: [
          DiaAtendimento.create({
            dia: Data.create('2023-01-01'),
            periodos: [
              Periodo.create({
                inicio: new Date('2023-01-01T00:00:00'),
                fim: new Date('2023-01-01T06:00:00'),
              }),
              Periodo.create({
                inicio: new Date('2023-01-01T06:00:00'),
                fim: new Date('2023-01-01T10:00:00'),
              }),
            ],
          }),
        ],
      });
      atendimento.setServicos([servicoPetAlimentacao, servicoPetPasseio]);
      expect(atendimento.valorAtendimento()).toBe(50 * 100 * 2 + 25 * 100 * 10);
    });
  });
});
