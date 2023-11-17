import { Disponibilidade } from '../value-objects';
import { Passeio } from './passeio';

describe('Passeio', () => {
  describe('calcularValor', () => {
    it('deve calcular valor do passeio com um periodo datas iguais', () => {
      const passeio = Passeio.create({
        valorPorHora: 200 * 100,
        disponibilidade: Disponibilidade.create({
          dia: new Date('2023-01-01'),
          periodos: [
            {
              inicio: new Date('2023-01-01'),
              fim: new Date('2023-01-01'),
            },
          ],
        }),
      });
      const valorPaseio = passeio.calcularValor([
        {
          inicio: new Date('2023-01-01'),
          fim: new Date('2023-01-01'),
        },
      ]);

      expect(valorPaseio).toBe(200 * 100);
    });

    it('deve calcular valor do passeio com um periodo datas 6 horas diferenca', () => {
      const passeio = Passeio.create({
        valorPorHora: 200 * 100,
        disponibilidade: Disponibilidade.create({
          dia: new Date('2023-11-17T00:00:00.000Z'),
          periodos: [
            {
              inicio: new Date('2023-11-17T00:00:00.000Z'),
              fim: new Date('2023-11-17T23:59:59.000Z'),
            },
          ],
        }),
      });
      const valorPaseio = passeio.calcularValor([
        {
          inicio: new Date('2023-11-17T00:00:00.000Z'),
          fim: new Date('2023-11-17T06:00:00.000Z'),
        },
      ]);

      expect(valorPaseio).toBe(1200 * 100);
    });

    it('deve calcular valor do passeio com dois periodos datas 3 horas diferenca', () => {
      const passeio = Passeio.create({
        valorPorHora: 200 * 100,
        disponibilidade: Disponibilidade.create({
          dia: new Date('2023-11-17T00:00:00.000Z'),
          periodos: [
            {
              inicio: new Date('2023-11-17T00:00:00.000Z'),
              fim: new Date('2023-11-17T23:59:59.000Z'),
            },
          ],
        }),
      });
      const valorPaseio = passeio.calcularValor([
        {
          inicio: new Date('2023-11-17T00:00:00.000Z'),
          fim: new Date('2023-11-17T03:00:00.000Z'),
        },
        {
          inicio: new Date('2023-11-17T00:00:00.000Z'),
          fim: new Date('2023-11-17T03:00:00.000Z'),
        },
      ]);

      expect(valorPaseio).toBe(1200 * 100);
    });
  });
});
