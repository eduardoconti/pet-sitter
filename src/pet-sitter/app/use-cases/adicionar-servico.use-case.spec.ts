import { Test, TestingModule } from '@nestjs/testing';

import { PetSitterModel } from '@pet-sitter/domain/models';
import {
  IPetSitterRepository,
  IServicoRepository,
} from '@pet-sitter/domain/repositories';
import { IAdicionarServicoUseCase } from '@pet-sitter/domain/use-cases';
import {
  PetSitterRepository,
  ServicoRepository,
} from '@pet-sitter/infra/repositories';
import { AdicionarServicoUseCaseProvider } from '@pet-sitter/main/providers';

import { StatusUsuario } from '@usuario/domain/enums';

import { TipoServicoEnum } from '@servico/domain/enums';

import { AdicionarServicoUseCase } from './adicionar-servico.use-case';

describe('AdicionarServicoUseCase', () => {
  let adicionarServicoUseCase: IAdicionarServicoUseCase;
  let petSitterRepository: IPetSitterRepository;
  let servicoRepository: IServicoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdicionarServicoUseCaseProvider,
        {
          provide: PetSitterRepository,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ServicoRepository,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    adicionarServicoUseCase = module.get<IAdicionarServicoUseCase>(
      AdicionarServicoUseCase,
    );
    petSitterRepository = module.get<IPetSitterRepository>(PetSitterRepository);
    servicoRepository = module.get<IServicoRepository>(ServicoRepository);
    jest.clearAllMocks();
  });
  it('deve estar definido', () => {
    expect(adicionarServicoUseCase).toBeDefined();
    expect(petSitterRepository).toBeDefined();
    expect(servicoRepository).toBeDefined();
  });

  it('deve adicionar um servico', async () => {
    const useCaseInput = {
      idUsuario: '63410879-ea97-4dbd-a942-183ce558716f',
      tipoServico: TipoServicoEnum.ALIMENTACAO,
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

    jest.spyOn(servicoRepository, 'save').mockResolvedValue({
      id: 1,
      idPetSitter: 2,
      tipoServico: useCaseInput.tipoServico,
      dataInclusao: new Date(),
    });
    const result = await adicionarServicoUseCase.executar(useCaseInput);

    expect(result).toBeUndefined();
    expect(petSitterRepository.get).toBeCalledWith(useCaseInput.idUsuario);
    expect(servicoRepository.save).toBeCalledWith({
      idPetSitter: 2,
      tipoServico: useCaseInput.tipoServico,
    });
  });
});
