import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PetSitterModel } from '@pet-sitter/domain/models';
import { IPetSitterRepository } from '@pet-sitter/domain/repositories';
import { Repository } from 'typeorm';

import { PetSitterSchema } from '../schemas';
import { PetSitterRepository } from './pet-sitter.repository';

describe('PetSitterRepository', () => {
  let petSitterRepository: IPetSitterRepository;
  let petSitterRepositoryOrm: Repository<PetSitterModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetSitterRepository,
        {
          provide: getRepositoryToken(PetSitterSchema),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    petSitterRepository = module.get<IPetSitterRepository>(PetSitterRepository);
    petSitterRepositoryOrm = module.get<Repository<PetSitterModel>>(
      getRepositoryToken(PetSitterSchema),
    );

    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(petSitterRepository).toBeDefined();
    expect(petSitterRepositoryOrm).toBeDefined();
  });

  describe('save', () => {
    it('deve salvar um petSitter', async () => {
      const data = Date.now();
      const petSitterModelMock: PetSitterModel = {
        id: '1',
        nome: 'Eduardo',
        dataInclusao: data,
        dataNascimento: data,
      };

      jest
        .spyOn(petSitterRepositoryOrm, 'save')
        .mockResolvedValue(petSitterModelMock);

      const result = await petSitterRepository.save({
        nome: petSitterModelMock.nome,
        dataNascimento: petSitterModelMock.dataNascimento,
      });

      expect(petSitterRepositoryOrm.save).toBeCalledWith({
        nome: petSitterModelMock.nome,
        dataNascimento: petSitterModelMock.dataNascimento,
        dataInclusao: expect.any(String),
      });

      expect(result).toBe(petSitterModelMock);
    });
  });
});
