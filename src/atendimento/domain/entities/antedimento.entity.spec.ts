import { UUID } from '@core/uuid.value-object';
import { Periodo } from '@core/value-objects';
import { PetEntity } from '@pet/domain/entities';
import { TemperamentoPetEnum } from '@pet/domain/enums';
import { Alimentacao, Passeio } from '@servico/domain/entities';

import { Atendimento } from './atendimento.entity';
import { ServicoPetAlimentacao } from './servico-pet-alimentacao.entity';
import { ServicoPetPasseio } from './servico-pet-passeio.entity';

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

  it('deve iniciar um antedimento', () => {
    const atendimento = Atendimento.novo();
    expect(atendimento).toEqual({
      _id: expect.any(String),
    });
  });

  describe('valor atendimento passeio', () => {
    it('deve calcular o valor de um antedimento com 1 periodo', () => {
      const servicoPetPasseio = ServicoPetPasseio.create({
        pet,
        servico: passeio,
        diasAtendimento: [
          {
            dia: new Date('2023-01-01'),
            periodo: [
              Periodo.create({
                inicio: new Date('2023-01-01T00:00:00'),
                fim: new Date('2023-01-01T06:00:00'),
              }),
            ],
          },
        ],
      });
      const atendimento = Atendimento.novo();
      atendimento.setServicos([servicoPetPasseio]);
      expect(atendimento.valorAtendimento()).toBe(25 * 100 * 6);
    });
    it('deve calcular o valor de um antedimento com 2 periodos', () => {
      const servicoPetPasseio = ServicoPetPasseio.create({
        pet,
        servico: passeio,
        diasAtendimento: [
          {
            dia: new Date('2023-01-01'),
            periodo: [
              Periodo.create({
                inicio: new Date('2023-01-01T00:00:00'),
                fim: new Date('2023-01-01T06:00:00'),
              }),
              Periodo.create({
                inicio: new Date('2023-01-01T06:00:00'),
                fim: new Date('2023-01-01T10:00:00'),
              }),
            ],
          },
        ],
      });
      const atendimento = Atendimento.novo();
      atendimento.setServicos([servicoPetPasseio]);
      expect(atendimento.valorAtendimento()).toBe(25 * 100 * 10);
    });
  });

  describe('valor atendimento alimentacao', () => {
    it('deve calcular o valor de um antedimento com 1 visita', () => {
      const servicoPetAlimentacao = ServicoPetAlimentacao.create({
        pet,
        servico: alimentacao,
        diasAtendimento: [
          {
            dia: new Date('2023-01-01'),
            periodo: [
              Periodo.create({
                inicio: new Date('2023-01-01T00:00:00'),
                fim: new Date('2023-01-01T00:00:00'),
              }),
            ],
          },
        ],
      });
      const atendimento = Atendimento.novo();
      atendimento.setServicos([servicoPetAlimentacao]);
      expect(atendimento.valorAtendimento()).toBe(50 * 100 * 1);
    });
    it('deve calcular o valor de um antedimento com 2 visitas', () => {
      const servicoPetAlimentacao = ServicoPetAlimentacao.create({
        pet,
        servico: alimentacao,
        diasAtendimento: [
          {
            dia: new Date('2023-01-01'),
            periodo: [
              Periodo.create({
                inicio: new Date('2023-01-01T00:00:00'),
                fim: new Date('2023-01-01T00:00:00'),
              }),
              Periodo.create({
                inicio: new Date('2023-01-01T00:00:00'),
                fim: new Date('2023-01-01T10:00:00'),
              }),
            ],
          },
        ],
      });
      const atendimento = Atendimento.novo();
      atendimento.setServicos([servicoPetAlimentacao]);
      expect(atendimento.valorAtendimento()).toBe(50 * 100 * 2);
    });
  });

  describe('valor atendimento alimentacao e passeio', () => {
    it('deve calcular o valor de um antedimento com 1 visita', () => {
      const servicoPetAlimentacao = ServicoPetAlimentacao.create({
        pet,
        servico: alimentacao,
        diasAtendimento: [
          {
            dia: new Date('2023-01-01'),
            periodo: [
              Periodo.create({
                inicio: new Date('2023-01-01T00:00:00'),
                fim: new Date('2023-01-01T00:00:00'),
              }),
            ],
          },
        ],
      });

      const servicoPetPasseio = ServicoPetPasseio.create({
        pet,
        servico: passeio,
        diasAtendimento: [
          {
            dia: new Date('2023-01-01'),
            periodo: [
              Periodo.create({
                inicio: new Date('2023-01-01T00:00:00'),
                fim: new Date('2023-01-01T06:00:00'),
              }),
            ],
          },
        ],
      });
      const atendimento = Atendimento.novo();
      atendimento.setServicos([servicoPetAlimentacao, servicoPetPasseio]);
      expect(atendimento.valorAtendimento()).toBe(50 * 100 * 1 + 25 * 100 * 6);
    });
    it('deve calcular o valor de um antedimento com 2 visitas', () => {
      const servicoPetAlimentacao = ServicoPetAlimentacao.create({
        pet,
        servico: alimentacao,
        diasAtendimento: [
          {
            dia: new Date('2023-01-01'),
            periodo: [
              Periodo.create({
                inicio: new Date('2023-01-01T00:00:00'),
                fim: new Date('2023-01-01T00:00:00'),
              }),
              Periodo.create({
                inicio: new Date('2023-01-01T00:00:00'),
                fim: new Date('2023-01-01T10:00:00'),
              }),
            ],
          },
        ],
      });

      const servicoPetPasseio = ServicoPetPasseio.create({
        pet,
        servico: passeio,
        diasAtendimento: [
          {
            dia: new Date('2023-01-01'),
            periodo: [
              Periodo.create({
                inicio: new Date('2023-01-01T00:00:00'),
                fim: new Date('2023-01-01T06:00:00'),
              }),
              Periodo.create({
                inicio: new Date('2023-01-01T06:00:00'),
                fim: new Date('2023-01-01T10:00:00'),
              }),
            ],
          },
        ],
      });
      const atendimento = Atendimento.novo();
      atendimento.setServicos([servicoPetAlimentacao, servicoPetPasseio]);
      expect(atendimento.valorAtendimento()).toBe(50 * 100 * 2 + 25 * 100 * 10);
    });
  });
});
