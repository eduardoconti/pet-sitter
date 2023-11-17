import { NomePetException } from '../exceptions';
import { NomePet } from './nome-pet.value-object';

describe('NomePet', () => {
  it('deve criar um objeto de valor NomePet', () => {
    const vo = NomePet.create('Gus');

    expect(vo.value).toBe('Gus');
  });

  it('deve criar um objeto de valor NomePet aplicando primeira letra maiuscula', () => {
    const vo = NomePet.create('  gus     husky  ');

    expect(vo.value).toBe('Gus Husky');
    expect(vo.equals(NomePet.create('Gus Husky')));
  });

  describe('validade', () => {
    it.each([null, undefined, 123])(
      'deve lancar erro NomePetException quando nome invalido',
      (value: any) => {
        expect(() => NomePet.create(value as unknown as string)).toThrowError(
          NomePetException.nomeInvalido(),
        );
      },
    );

    it.each([
      'a',
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    ])(
      'deve lancar erro NomePetException quando range do nome invalido',
      (value: any) => {
        expect(() => NomePet.create(value as unknown as string)).toThrowError(
          NomePetException.rangeInvalido(),
        );
      },
    );
  });
});
