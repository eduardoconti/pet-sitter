import { PetEntity } from './pet.entity';
describe('PetEntity', () => {
  it('deve criar um entidade PetEntity', () => {
    const petEntity = PetEntity.create({ nome: 'Gus' });

    expect(petEntity).toEqual({
      _id: expect.any(String),
      _nome: 'Gus',
    });
  });
});
