import { Test, TestingModule } from '@nestjs/testing';

import { PetSitterModel } from '@pet-sitter/domain/models';
import {
  IPetSitterRepository,
  ILocalAtendimentoRepository,
} from '@pet-sitter/domain/repositories';
import { IAdicionarLocalAtendimentoUseCase } from '@pet-sitter/domain/use-cases';
import {
  PetSitterRepository,
  LocalAtendimentoRepository,
} from '@pet-sitter/infra/repositories';
import { AdicionarLocalAtendimentoUseCaseProvider } from '@pet-sitter/main/providers';

import { StatusUsuario } from '@usuario/domain/enums';

import { CidadeModel } from '@localizacao/domain/models';

import { AdicionarLocalAtendimentoUseCase } from './adicionar-local-atendimento.use-case';
describe('AdicionarLocalAtendimentoUseCase', () => {
  let adicionarLocalAtendimentoUseCase: IAdicionarLocalAtendimentoUseCase;
  let petSitterRepository: IPetSitterRepository;
  let localAtendimentoRepository: ILocalAtendimentoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdicionarLocalAtendimentoUseCaseProvider,
        {
          provide: PetSitterRepository,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: LocalAtendimentoRepository,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    adicionarLocalAtendimentoUseCase =
      module.get<IAdicionarLocalAtendimentoUseCase>(
        AdicionarLocalAtendimentoUseCase,
      );
    petSitterRepository = module.get<IPetSitterRepository>(PetSitterRepository);
    localAtendimentoRepository = module.get<ILocalAtendimentoRepository>(
      LocalAtendimentoRepository,
    );
    jest.clearAllMocks();
  });
  it('deve estar definido', () => {
    expect(adicionarLocalAtendimentoUseCase).toBeDefined();
    expect(petSitterRepository).toBeDefined();
    expect(localAtendimentoRepository).toBeDefined();
  });

  it('deve adicionar um localAtendimento para uma cidade', async () => {
    const useCaseInput = {
      idPetSitter: 2,
      idCidade: 3,
      idUsuario: '63410879-ea97-4dbd-a942-183ce558716f',
    };

    const petSitterModelMock: PetSitterModel = {
      id: 2,
      idUsuario: '63410879-ea97-4dbd-a942-183ce558716f',
      dataInclusao: new Date(),
      usuario: {
        id: '63410879-ea97-4dbd-a942-183ce558716f',
        nome: 'Eduardo',
        email: 'es.eduardoconti@gmail.com',
        senha: 'fake@123',
        dataNascimento: new Date('1995-12-05'),
        dataInclusao: new Date(),
        sobreNome: 'Conti',
        status: StatusUsuario.ATIVO,
      },
    };

    jest
      .spyOn(petSitterRepository, 'get')
      .mockResolvedValue(petSitterModelMock);

    jest.spyOn(localAtendimentoRepository, 'save').mockResolvedValue({
      id: 1,
      idPetSitter: 2,
      idCidade: 3,
      dataInclusao: new Date(),
      cidade: {
        id: 3,
        idEstado: 1,
        nome: 'Cidade',
      } as CidadeModel,
    });
    const result = await adicionarLocalAtendimentoUseCase.executar(
      useCaseInput,
    );

    expect(result).toBeUndefined();
    expect(petSitterRepository.get).toBeCalledWith(useCaseInput.idUsuario);
    expect(localAtendimentoRepository.save).toBeCalledWith({
      idPetSitter: 2,
      idCidade: 3,
      idRegiao: null,
    });
  });
});
