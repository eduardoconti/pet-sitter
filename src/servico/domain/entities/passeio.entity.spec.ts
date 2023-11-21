import { UUID } from '@core/uuid.value-object';
import { Periodo } from '@core/value-objects';

import { Passeio } from './passeio';

const fakeUUID = UUID.generate();
describe('Passeio', () => {
  describe('calcularValor', () => {
    it('deve calcular valor do passeio com um periodo datas iguais', () => {
      const passeio = Passeio.create({
        valorPorHora: 200 * 100,
        tempoMaximo: 2 * 60 * 60,
        idPetSitter: fakeUUID,
      });

      const periodo = Periodo.create({
        inicio: new Date('2023-01-01'),
        fim: new Date('2023-01-01'),
      });

      const valorPaseio = passeio.calcularValor(periodo.horas);

      expect(valorPaseio).toBe(200 * 100);
    });

    it('deve calcular valor do passeio com um periodo datas 6 horas diferenca', () => {
      const passeio = Passeio.create({
        valorPorHora: 200 * 100,
        tempoMaximo: 2 * 60 * 60,
        idPetSitter: fakeUUID,
      });

      const periodo = Periodo.create({
        inicio: new Date('2023-11-17T00:00:00.000Z'),
        fim: new Date('2023-11-17T06:00:00.000Z'),
      });

      const valorPaseio = passeio.calcularValor(periodo.horas);

      expect(valorPaseio).toBe(1200 * 100);
    });

    it('deve calcular valor do passeio com dois periodos datas 3 horas diferenca', () => {
      const passeio = Passeio.create({
        valorPorHora: 200 * 100,
        tempoMaximo: 2 * 60 * 60,
        idPetSitter: fakeUUID,
      });

      const periodo1 = Periodo.create({
        inicio: new Date('2023-11-17T00:00:00.000Z'),
        fim: new Date('2023-11-17T03:00:00.000Z'),
      });

      const periodo2 = Periodo.create({
        inicio: new Date('2023-11-17T00:00:00.000Z'),
        fim: new Date('2023-11-17T03:00:00.000Z'),
      });

      const valorPaseio = passeio.calcularValor(
        periodo1.horas + periodo2.horas,
      );

      expect(valorPaseio).toBe(1200 * 100);
    });
  });
});
