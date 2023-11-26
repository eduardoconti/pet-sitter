import { Data } from './data.value-object';

describe('Data', () => {
  describe('Novo objeto de valor Data', () => {
    it('deve criar um objeto de valor Data a partir de um Date', () => {
      const date = new Date('2023-01-01');

      const data = Data.create(date);
      expect(data).toEqual({
        props: date,
      });
    });

    it('deve criar um objeto de valor Data a partir de uma string', () => {
      const date = new Date('2023-01-01');

      const data = Data.create('2023-01-01T00:00:00.000Z');
      expect(data).toEqual({
        props: date,
      });
    });

    it('deve criar um objeto de valor Data a partir de um time stamp', () => {
      const date = new Date('2023-01-01T00:00:00.000Z');
      const data = Data.create(1672531200000);
      expect(data).toEqual({
        props: date,
      });
    });

    it.each([undefined, null, '2023-0101', 'ABC', '01011010', '2023-13-01'])(
      'deve lancar erro Data invalida',
      (value: Date | number | string | undefined | null) => {
        expect(() => Data.create(value as any)).toThrowError(
          new Error('Data invalida'),
        );
      },
    );
  });
});
