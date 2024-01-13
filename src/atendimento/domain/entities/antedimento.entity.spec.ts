import { PetSitter } from '@pet-sitter/domain/entities';
import { PetEntity } from '@pet/domain/entities';
import { TemperamentoPetEnum } from '@pet/domain/enums';

import { UUID } from '@core/uuid.value-object';
import { Intervalo, Periodo } from '@core/value-objects';

import { Alimentacao, Hospedagem, Passeio } from '@servico/domain/entities';

import { Atendimento } from './atendimento.entity';
import { SolicitacaoAlimentacao } from './solicitacao-servico-pet-alimentacao.entity';
import { SolicitacaoHospedagem } from './solicitacao-servico-pet-hospedagem.entity';
import { SolicitacaoPasseio } from './solicitacao-servico-pet-passeio.entity';

describe('Atendimento', () => {
  const passeio = Passeio.create({
    idPetSitter: UUID.generate(),
    valorPorHora: 25 * 100,
  });

  const alimentacao = Alimentacao.create({
    idPetSitter: UUID.generate(),
    valorPorVisita: 50 * 100,
  });

  const hospedagem = Hospedagem.create({
    idPetSitter: UUID.generate(),
    valorDiaria: 150 * 100,
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
      _status: 'N',
    });
  });

  describe('valor atendimento passeio', () => {
    const atendimento = Atendimento.novo();
    atendimento.setPetSitter(petSitter);
    it('deve calcular o valor de um antedimento com 1 periodo de 6 horas', () => {
      const servicoPetPasseio = SolicitacaoPasseio.create({
        pet,
        servico: passeio,
        periodos: [
          Intervalo.create({
            inicio: new Date('2023-01-01T00:00:00'),
            fim: new Date('2023-01-01T06:00:00'),
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
        periodos: [
          Intervalo.create({
            inicio: new Date('2023-01-01T00:00:00'),
            fim: new Date('2023-01-01T06:00:00'),
          }),
          Intervalo.create({
            inicio: new Date('2023-01-01T06:00:00'),
            fim: new Date('2023-01-01T10:00:00'),
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
        periodos: [
          Intervalo.create({
            inicio: new Date('2023-01-01T00:00:00'),
            fim: new Date('2023-01-01T00:00:00'),
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
        periodos: [
          Intervalo.create({
            inicio: new Date('2023-01-01T00:00:00'),
            fim: new Date('2023-01-01T00:00:00'),
          }),
          Intervalo.create({
            inicio: new Date('2023-01-01T00:00:00'),
            fim: new Date('2023-01-01T10:00:00'),
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
        periodos: [
          Intervalo.create({
            inicio: new Date('2023-01-01T00:00:00'),
            fim: new Date('2023-01-01T00:00:00'),
          }),
        ],
      });

      const servicoPetPasseio = SolicitacaoPasseio.create({
        pet,
        servico: passeio,
        periodos: [
          Intervalo.create({
            inicio: new Date('2023-01-01T00:00:00'),
            fim: new Date('2023-01-01T06:00:00'),
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
        periodos: [
          Intervalo.create({
            inicio: new Date('2023-01-01T00:00:00'),
            fim: new Date('2023-01-01T00:00:00'),
          }),
          Intervalo.create({
            inicio: new Date('2023-01-01T00:00:00'),
            fim: new Date('2023-01-01T10:00:00'),
          }),
        ],
      });

      const servicoPetPasseio = SolicitacaoPasseio.create({
        pet,
        servico: passeio,
        periodos: [
          Intervalo.create({
            inicio: new Date('2023-01-01T00:00:00'),
            fim: new Date('2023-01-01T06:00:00'),
          }),
          Intervalo.create({
            inicio: new Date('2023-01-01T06:00:00'),
            fim: new Date('2023-01-01T10:00:00'),
          }),
        ],
      });
      atendimento.setServicos([servicoPetAlimentacao, servicoPetPasseio]);
      expect(atendimento.valorAtendimento()).toBe(50 * 100 * 2 + 25 * 100 * 10);
    });
  });

  describe('valor atendimento hospedagem', () => {
    const atendimento = Atendimento.novo();
    atendimento.setPetSitter(petSitter);
    it('deve calcular o valor de um antedimento com 1 diaria', () => {
      const servicoPetHospedagem = SolicitacaoHospedagem.create({
        pet,
        servico: hospedagem,
        periodos: [
          Periodo.create({
            inicio: new Date('2023-01-01T00:00:00'),
            fim: new Date('2023-01-01T00:00:00'),
          }),
        ],
      });

      atendimento.setServicos([servicoPetHospedagem]);
      expect(atendimento.valorAtendimento()).toBe(150 * 100 * 1);
    });
    it('deve calcular o valor de um antedimento com 3 diarias', () => {
      const servicoPetHospedagem = SolicitacaoHospedagem.create({
        pet,
        servico: hospedagem,
        periodos: [
          Periodo.create({
            inicio: new Date('2023-01-01T08:00:00'),
            fim: new Date('2023-01-03T16:00:00'),
          }),
        ],
      });

      atendimento.setServicos([servicoPetHospedagem]);
      expect(atendimento.valorAtendimento()).toBe(150 * 100 * 3);
    });
  });
});
