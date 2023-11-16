import { TemperamentoPetEnum } from '../enums/temperamento.enum';
import { PetEntity } from './pet.entity';
describe('PetEntity', () => {
  it('deve criar um entidade PetEntity', () => {
    const petEntity = PetEntity.create({
      nome: 'Gus',
      temperamento: TemperamentoPetEnum.DOCIL,
    });

    expect(petEntity).toEqual({
      _id: expect.any(String),
      _nome: 'Gus',
      _temperamento: TemperamentoPetEnum.DOCIL,
    });
  });

  it('deve criar uma entidade PetEntity a partir de um model', () => {
    const petEntity = PetEntity.fromModel({
      nome: 'Gus',
      id: 'fakeUUid',
      dataInclusao: Date.now(),
      temperamento: TemperamentoPetEnum.DOCIL,
    });

    expect(petEntity).toEqual({
      _id: 'fakeUUid',
      _nome: 'Gus',
      _temperamento: TemperamentoPetEnum.DOCIL,
    });
  });

  it('deve criar um model a partir da entidade PetEntity', () => {
    const petEntity = PetEntity.create({
      nome: 'Gus',
      temperamento: TemperamentoPetEnum.DOCIL,
    });
    const petModel = PetEntity.toModel(petEntity);

    expect(petModel).toEqual({
      id: expect.any(String),
      nome: 'Gus',
      temperamento: TemperamentoPetEnum.DOCIL,
    });
  });
});
