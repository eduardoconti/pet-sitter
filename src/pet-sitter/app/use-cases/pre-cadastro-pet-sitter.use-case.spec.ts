import { Test, TestingModule } from '@nestjs/testing';

import { PetSitterModel } from '@pet-sitter/domain/models';
import { IPetSitterRepository } from '@pet-sitter/domain/repositories';
import { IPreCadastroPetSitterUseCase } from '@pet-sitter/domain/use-cases';
import { PetSitterRepository } from '@pet-sitter/infra/repositories';
import { CadastrarPetSitterUseCaseProvider } from '@pet-sitter/main/providers';

import { PasswordService } from '@infra/bcrypt';

import { IHash } from '@core/contracts';

import { IAtivarCadastroMailerService } from '@usuario/app/services';
import { StatusUsuario } from '@usuario/domain/enums';
import { AtivarCadastroMailerService } from '@usuario/infra/services';

import { PreCadastroPetSitterUseCase } from './pre-cadastro-pet-sitter.use-case';

describe('PreCadastroPetSitterUseCase', () => {
  let predCadastroPetSitterUseCase: IPreCadastroPetSitterUseCase;
  let petSitterRepository: IPetSitterRepository;
  let passwordService: IHash;
  let mailerServce: IAtivarCadastroMailerService;

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
        {
          provide: PasswordService,
          useValue: {
            hash: jest.fn().mockResolvedValue('hashPass'),
          },
        },
        {
          provide: AtivarCadastroMailerService,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    predCadastroPetSitterUseCase = module.get<IPreCadastroPetSitterUseCase>(
      PreCadastroPetSitterUseCase,
    );
    petSitterRepository = module.get<IPetSitterRepository>(PetSitterRepository);
    passwordService = module.get<IHash>(PasswordService);
    mailerServce = module.get<IAtivarCadastroMailerService>(
      AtivarCadastroMailerService,
    );
    jest.clearAllMocks();
  });
  it('deve estar definido', () => {
    expect(predCadastroPetSitterUseCase).toBeDefined();
    expect(petSitterRepository).toBeDefined();
    expect(passwordService).toBeDefined();
    expect(mailerServce).toBeDefined();
  });

  it('deve cadastrar um petSitter', async () => {
    const petSitterModelMock: PetSitterModel = {
      id: 1,
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
        status: StatusUsuario.PENDENTE_ATIVACAO,
      },
    };
    jest
      .spyOn(petSitterRepository, 'save')
      .mockResolvedValue(petSitterModelMock);
    const result = await predCadastroPetSitterUseCase.executar({
      id: undefined,
      dataNascimento: petSitterModelMock.usuario.dataNascimento,
      email: petSitterModelMock.usuario.email,
      senha: petSitterModelMock.usuario.senha,
      nome: petSitterModelMock.usuario.nome,
      sobreNome: petSitterModelMock.usuario.sobreNome,
    });

    expect(result).toEqual({
      id: petSitterModelMock.idUsuario,
      email: petSitterModelMock.usuario.email,
      nome: petSitterModelMock.usuario.nome,
      dataNascimento: petSitterModelMock.usuario.dataNascimento,
      sobreNome: petSitterModelMock.usuario.sobreNome,
    });
    expect(petSitterRepository.save).toBeCalledWith({
      usuario: {
        ...petSitterModelMock.usuario,
        senha: 'hashPass',
        dataInclusao: expect.any(String),
        id: undefined,
        status: StatusUsuario.PENDENTE_ATIVACAO,
      },
    });
    expect(passwordService.hash).toBeCalledWith(
      petSitterModelMock.usuario.senha,
    );
    expect(mailerServce.send).toBeCalledWith(
      petSitterModelMock.usuario.email,
      petSitterModelMock.usuario.id,
    );
  });
});
