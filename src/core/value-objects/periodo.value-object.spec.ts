import { IPeriodo } from '@core/contracts';

import { Periodo } from './periodo.value-object';

describe('Periodo', () => {
  describe('Novo periodo', () => {
    it('deve criar um objeto de valor Periodo', () => {
      const inicio = new Date('2023-01-01');
      const fim = new Date('2023-01-02');
      const periodo = Periodo.create({
        inicio,
        fim,
      });
      expect(periodo).toEqual({
        props: {
          dataInicio: { props: inicio },
          dataFim: { props: fim },
        },
      });
    });

    it('deve lancar erro Data inicio maior que data fim', () => {
      const inicio = new Date('2023-01-02');
      const fim = new Date('2023-01-01');
      expect(() => {
        Periodo.create({
          inicio,
          fim,
        });
      }).toThrowError(new Error('Data inicio maior que data fim'));
    });

    it.each([null, undefined, {}, { inicio: '' }, { fim: '' }])(
      'deve lancar erro Periodo invalido',
      () => {
        expect((value: any) => {
          Periodo.create(value);
        }).toThrowError(new Error('Periodo invalido'));
      },
    );
  });
  describe('horasEntrePeriodo', () => {
    it('deve calcular horas entre periodo no mesmo dia', () => {
      const inicio = new Date('2023-01-01T00:00:00.000Z');
      const fim = new Date('2023-01-01T12:00:00.000Z');
      const periodo = Periodo.create({
        inicio,
        fim,
      });
      expect(periodo.horasEntrePeriodo()).toEqual(12);
    });

    it('deve calcular horas entre periodo entre 2 dias', () => {
      const inicio = new Date('2023-01-01T00:00:00.000Z');
      const fim = new Date('2023-01-02T12:00:00.000Z');
      const periodo = Periodo.create({
        inicio,
        fim,
      });
      expect(periodo.horasEntrePeriodo()).toEqual(36);
    });

    it.each([
      {
        inicio: new Date('2023-01-01T00:00:00.000Z'),
        fim: new Date('2023-01-01T00:00:00.000Z'),
      },
      {
        inicio: new Date('2023-01-01T00:00:00.000Z'),
        fim: new Date('2023-01-01T00:00:59.999Z'),
      },
      {
        inicio: new Date('2023-01-01T00:00:00.000Z'),
        fim: new Date('2023-01-01T00:00:30.000Z'),
      },
    ])(
      'deve retornar 1 quando intervalo for menor que 1 hora',
      (value: IPeriodo) => {
        const periodo = Periodo.create(value);
        expect(periodo.horasEntrePeriodo()).toEqual(1);
      },
    );

    it.each([
      {
        inicio: new Date('2023-01-01T00:00:00.000Z'),
        fim: new Date('2023-01-01T01:59:59.999Z'),
        resultado: 2,
      },
      {
        inicio: new Date('2023-01-01T00:00:00.000Z'),
        fim: new Date('2023-01-01T02:00:00.001Z'),
        resultado: 3,
      },
      {
        inicio: new Date('2023-01-01T00:00:00.000Z'),
        fim: new Date('2023-01-01T03:30:00.000Z'),
        resultado: 4,
      },
    ])(
      'deve considerar proximo valor inteiro quando horas for fracao',
      (value: IPeriodo & { resultado: number }) => {
        const { resultado } = value;
        const periodo = Periodo.create(value);
        expect(periodo.horasEntrePeriodo()).toEqual(resultado);
      },
    );
  });

  describe('diasEntrePeriodo', () => {
    it('deve calcular 1 diaria', () => {
      const inicio = new Date('2023-01-01T00:00:00.000Z');
      const fim = new Date('2023-01-01T12:00:00.000Z');
      const periodo = Periodo.create({
        inicio,
        fim,
      });
      expect(periodo.diasEntrePeriodo()).toEqual(1);
    });

    it('deve calcular 2 diarias', () => {
      const inicio = new Date('2023-01-01T00:00:00.000Z');
      const fim = new Date('2023-01-02T12:00:00.000Z');
      const periodo = Periodo.create({
        inicio,
        fim,
      });

      expect(periodo.diasEntrePeriodo()).toEqual(2);
    });

    it('deve calcular 3 diarias', () => {
      const inicio = new Date('2023-01-01T08:00:00.000Z');
      const fim = new Date('2023-01-03T12:00:00.000Z');
      const periodo = Periodo.create({
        inicio,
        fim,
      });
      expect(periodo.diasEntrePeriodo()).toEqual(3);
    });
  });
});
