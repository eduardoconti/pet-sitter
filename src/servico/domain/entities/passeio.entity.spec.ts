import { UUID } from '@core/uuid.value-object';

import { Passeio } from './passeio';

const fakeUUID = UUID.generate();
describe('Passeio', () => {
  describe('valor', () => {
    it('deve retornar valor do passeio', () => {
      const passeio = Passeio.create({
        valorPorHora: 200,
        idPetSitter: fakeUUID,
      });

      const valorPaseio = passeio.valor();

      expect(valorPaseio).toBe(200);
    });
  });
});
