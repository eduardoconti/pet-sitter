import { TemperamentoPetEnum } from '../enums/temperamento.enum';
import { PetEntity } from './pet.entity';
describe('PetEntity', () => {
  it('deve criar um entidade PetEntity', () => {
    const petEntity = PetEntity.create({
      nome: 'Gus',
      temperamento: TemperamentoPetEnum.DOCIL,
    });

    expect(petEntity).toEqual({
      _nome: { props: { value: 'Gus' } },
      _temperamento: { props: { value: 'D' } },
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
      _nome: { props: { value: 'Gus' } },
      _temperamento: { props: { value: 'D' } },
    });
  });

  it('deve criar um model a partir da entidade PetEntity', () => {
    const petEntity = PetEntity.create({
      nome: 'Gus',
      temperamento: TemperamentoPetEnum.DOCIL,
    });
    const petModel = PetEntity.toModel(petEntity);

    expect(petModel).toEqual({
      nome: 'Gus',
      temperamento: TemperamentoPetEnum.DOCIL,
    });
  });
});
