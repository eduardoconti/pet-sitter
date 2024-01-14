import { Test, TestingModule } from '@nestjs/testing';

import { PetSitterModel } from '@pet-sitter/domain/models';
import { IPetSitterRepository } from '@pet-sitter/domain/repositories';
import { IPreCadastroPetSitterUseCase } from '@pet-sitter/domain/use-cases';
import { PetSitterRepository } from '@pet-sitter/infra/repositories';
import { CadastrarPetSitterUseCaseProvider } from '@pet-sitter/main/providers';

import { PreCadastroPetSitterUseCase } from './pre-cadastro-pet-sitter.use-case';

describe('CadastrarPetSitterUseCase', () => {
  let cadastrarPetSitterUseCase: IPreCadastroPetSitterUseCase;
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

    cadastrarPetSitterUseCase = module.get<IPreCadastroPetSitterUseCase>(
      PreCadastroPetSitterUseCase,
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
      idUsuario: '63410879-ea97-4dbd-a942-183ce558716f',
      dataInclusao: new Date(),
      usuario: {
        id: '63410879-ea97-4dbd-a942-183ce558716f',
        nome: 'Eduardo',
        email: 'es.eduardoconti@gmail.com',
        senha: 'fake!12',
        dataNascimento: new Date('1995-12-05'),
        dataInclusao: new Date(),
      },
    };
    jest
      .spyOn(petSitterRepository, 'save')
      .mockResolvedValue(petSitterModelMock);
    const result = await cadastrarPetSitterUseCase.executar({
      id: undefined,
      dataNascimento: petSitterModelMock.usuario.dataNascimento,
      email: petSitterModelMock.usuario.email,
      senha: petSitterModelMock.usuario.senha,
      nome: petSitterModelMock.usuario.nome,
    });

    expect(result).toEqual({
      id: petSitterModelMock.idUsuario,
      email: petSitterModelMock.usuario.email,
      nome: petSitterModelMock.usuario.nome,
      dataNascimento: petSitterModelMock.usuario.dataNascimento,
    });
    expect(petSitterRepository.save).toBeCalledWith({
      usuario: {
        ...petSitterModelMock.usuario,
        dataInclusao: expect.any(String),
        id: undefined,
      },
    });
  });
});
