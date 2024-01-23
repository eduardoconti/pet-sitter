import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PetSitterModel } from '@pet-sitter/domain/models';
import { IPetSitterRepository } from '@pet-sitter/domain/repositories';

import { PetSitterSchema } from '../schemas';
import { PetSitterRepository } from './pet-sitter.repository';
import { StatusUsuario } from '@usuario/domain/enums';

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
        id: 1,
        dataInclusao: data,
        idUsuario: '63410879-ea97-4dbd-a942-183ce558716f',
        usuario: {
          id: '63410879-ea97-4dbd-a942-183ce558716f',
          email: '',
          nome: 'Eduardo',
          sobreNome: 'Conti',
          status: StatusUsuario.PENDENTE_ATIVACAO,
          dataNascimento: data,
          senha: 'fake@123',
          dataInclusao: new Date('2024-01-01'),
        },
      };

      jest
        .spyOn(petSitterRepositoryOrm, 'save')
        .mockResolvedValue(petSitterModelMock);

      const result = await petSitterRepository.save({
        usuario: petSitterModelMock.usuario,
      });

      expect(petSitterRepositoryOrm.save).toBeCalledWith({
        dataInclusao: expect.anything(),
        usuario: {
          ...petSitterModelMock.usuario,
          dataInclusao: expect.anything(),
        },
      });

      expect(result).toBe(petSitterModelMock);
    });
  });
});
