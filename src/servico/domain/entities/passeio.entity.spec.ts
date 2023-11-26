import { UUID } from '@core/uuid.value-object';

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

      const valorPaseio = passeio.valor();

      expect(valorPaseio).toBe(200 * 100);
    });

    it('deve calcular valor do passeio com um periodo datas 6 horas diferenca', () => {
      const passeio = Passeio.create({
        valorPorHora: 200 * 100,
        tempoMaximo: 2 * 60 * 60,
        idPetSitter: fakeUUID,
      });

      const valorPaseio = passeio.valor();

      expect(valorPaseio).toBe(200 * 100);
    });
  });
});
