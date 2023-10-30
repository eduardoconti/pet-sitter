import { Test, TestingModule } from '@nestjs/testing';
import { IPetRepository } from '@pet/domain/repositories';
import { PetRepository } from './pet.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PetSchema } from '../schemas';
import { Repository } from 'typeorm';
import { PetModel } from '@pet/domain/models';

describe('PetRepository', () => {
  let petRepository: IPetRepository;
  let petRepositoryOrm: Repository<PetModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetRepository,
        {
          provide: getRepositoryToken(PetSchema),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    petRepository = module.get<IPetRepository>(PetRepository);
    petRepositoryOrm = module.get<Repository<PetModel>>(
      getRepositoryToken(PetSchema),
    );
  });

  it('deve estar definido', () => {
    expect(petRepository).toBeDefined();
    expect(petRepositoryOrm).toBeDefined();
  });

  describe('save', () => {
    it('deve salvar um pet', async () => {
      const data = Date.now();
      const petModlMock = {
        id: '1',
        nome: 'Gus',
        dataInclusao: data,
      };
      jest.spyOn(petRepositoryOrm, 'save').mockResolvedValue(petModlMock);

      const result = await petRepository.save(petModlMock);

      expect(result).toBe(petModlMock);
    });
  });
});
