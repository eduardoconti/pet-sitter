import { Test, TestingModule } from '@nestjs/testing';

import { IPetSitterRepository } from '@pet-sitter/domain/repositories';
import { IAtualizarCadastroPetSitterUseCase } from '@pet-sitter/domain/use-cases';
import { PetSitterRepository } from '@pet-sitter/infra/repositories';
import { AtualizarCadastroPetSitterCaseUseProvider } from '@pet-sitter/main/providers';

import { AtualizarCadastroPetSitterUseCase } from './atualizar-cadastro-pet-sitter.use-case';

describe('AtualizarCadastroPetSitterUseCase', () => {
  let predCadastroPetSitterUseCase: IAtualizarCadastroPetSitterUseCase;
  let petSitterRepository: IPetSitterRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AtualizarCadastroPetSitterCaseUseProvider,
        {
          provide: PetSitterRepository,
          useValue: {
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    predCadastroPetSitterUseCase =
      module.get<IAtualizarCadastroPetSitterUseCase>(
        AtualizarCadastroPetSitterUseCase,
      );
    petSitterRepository = module.get<IPetSitterRepository>(PetSitterRepository);
    jest.clearAllMocks();
  });
  it('deve estar definido', () => {
    expect(predCadastroPetSitterUseCase).toBeDefined();
    expect(petSitterRepository).toBeDefined();
  });

  it('deve atualizar todos os dados editaveis do pet sitter', async () => {
    const useCaseInput = {
      id: '63410879-ea97-4dbd-a942-183ce558716f',
      idPetSitter: 1,
      nome: 'Eduardo',
      sobreNome: 'Conti',
      dataNascimento: new Date(),
      bio: 'Fake bio',
    };
    jest.spyOn(petSitterRepository, 'update').mockResolvedValue({
      ...useCaseInput,
      id: 1,
      idUsuario: '63410879-ea97-4dbd-a942-183ce558716f',
    });
    const result = await predCadastroPetSitterUseCase.executar(useCaseInput);

    expect(result).toEqual(useCaseInput);
    expect(petSitterRepository.update).toBeCalledWith({
      id: useCaseInput.idPetSitter,
      bio: useCaseInput.bio,
      usuario: {
        nome: useCaseInput.nome,
        dataNascimento: useCaseInput.dataNascimento,
        sobreNome: useCaseInput.sobreNome,
        id: useCaseInput.id,
      },
    });
  });
});
