import { TemperamentoPetEnum } from '../enums';
import { TemperamentoPetException } from '../exceptions';
import { TemperamentoPet } from './temperamento-pet.value-object';

describe('TemperamentoPet', () => {
  it('deve criar um objeto de valor TemperamentoPet Agressivo', () => {
    const vo = TemperamentoPet.create(TemperamentoPetEnum.AGRESSIVO);

    expect(vo.value).toBe('A');
  });

  it('deve criar um objeto de valor TemperamentoPet Docil', () => {
    const vo = TemperamentoPet.create(TemperamentoPetEnum.DOCIL);

    expect(vo.value).toBe('D');
  });

  describe('validade', () => {
    it.each(['B', undefined, null])(
      'deve lancar erro TemperamentoPetException quando Temperamento invalido',
      (value: any) => {
        expect(() =>
          TemperamentoPet.create(value as unknown as TemperamentoPetEnum),
        ).toThrowError(TemperamentoPetException.invalido());
      },
    );
  });
});
