import { Test, TestingModule } from '@nestjs/testing';

import { PetSitterModel } from '@pet-sitter/domain/models';
import { IPetSitterRepository } from '@pet-sitter/domain/repositories';
import { ICadastrarPetSitterUseCase } from '@pet-sitter/domain/use-cases';
import { PetSitterRepository } from '@pet-sitter/infra/repositories';
import { CadastrarPetSitterUseCaseProvider } from '@pet-sitter/main/providers';

import { CadastrarPetSitterUseCase } from './cadastrar-pet-sitter.use-case';

describe('CadastrarPetSitterUseCase', () => {
  let cadastrarPetSitterUseCase: ICadastrarPetSitterUseCase;
  let petSitterRepository: IPetSitterRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CadastrarPetSitterUseCaseProvider,
        {
          provide: PetSitterRepository,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    cadastrarPetSitterUseCase = module.get<ICadastrarPetSitterUseCase>(
      CadastrarPetSitterUseCase,
    );
    petSitterRepository = module.get<IPetSitterRepository>(PetSitterRepository);

    jest.clearAllMocks();
  });
  it('deve estar definido', () => {
    expect(cadastrarPetSitterUseCase).toBeDefined();
    expect(petSitterRepository).toBeDefined();
  });

  it('deve cadastrar um petSitter', async () => {
    const petSitterModelMock: PetSitterModel = {
      id: 'fakeUUid',
      nome: 'Gus',
      dataInclusao: new Date(),
      dataNascimento: new Date(),
    };
    jest
      .spyOn(petSitterRepository, 'save')
      .mockResolvedValue(petSitterModelMock);
    const result = await cadastrarPetSitterUseCase.executar({
      ...petSitterModelMock,
      id: undefined,
    });

    expect(result).toEqual({
      id: petSitterModelMock.id,
      nome: petSitterModelMock.nome,
      dataNascimento: petSitterModelMock.dataNascimento,
    });
    expect(petSitterRepository.save).toBeCalledWith({
      nome: petSitterModelMock.nome,
      dataNascimento: petSitterModelMock.dataNascimento,
    });
  });
});
