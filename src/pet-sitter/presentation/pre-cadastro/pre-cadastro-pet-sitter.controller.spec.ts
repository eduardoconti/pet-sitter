import { Test, TestingModule } from '@nestjs/testing';

import { PreCadastroPetSitterUseCase } from '@pet-sitter/app/use-cases';
import { IPreCadastroPetSitterUseCase } from '@pet-sitter/domain/use-cases';

import { PreCadastroPetSitterController } from './pre-cadastro-pet-sitter.controller';

describe('CadastrarPetSitterController', () => {
  let controller: PreCadastroPetSitterController;
  let cadastrarPetSitterUseCase: IPreCadastroPetSitterUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreCadastroPetSitterController],
      providers: [
        {
          provide: PreCadastroPetSitterUseCase,
          useValue: {
            executar: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PreCadastroPetSitterController>(
      PreCadastroPetSitterController,
    );
    cadastrarPetSitterUseCase = module.get<IPreCadastroPetSitterUseCase>(
      PreCadastroPetSitterUseCase,
    );

    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
    expect(cadastrarPetSitterUseCase).toBeDefined();
  });

  it('deve cadastrar um pet-sitter', async () => {
    jest.spyOn(cadastrarPetSitterUseCase, 'executar').mockResolvedValue({
      id: 'FakeUUID',
      nome: 'Eduardo',
      dataNascimento: new Date('1995-12-05'),
      email: 'es.eduardoconti@gmail.com',
      sobreNome: 'Conti',
    });

    const result = await controller.handle({
      nome: 'Eduardo',
      email: 'es.eduardoconti@gmail.com',
      senha: 'fake!12',
      dataNascimento: new Date('1995-12-05'),
      sobreNome: 'Conti',
    });

    expect(result).toEqual({
      id: 'FakeUUID',
      nome: 'Eduardo',
      dataNascimento: new Date('1995-12-05'),
      email: 'es.eduardoconti@gmail.com',
      sobreNome: 'Conti',
    });

    expect(cadastrarPetSitterUseCase.executar).toBeCalledWith({
      nome: 'Eduardo',
      email: 'es.eduardoconti@gmail.com',
      senha: 'fake!12',
      dataNascimento: new Date('1995-12-05'),
      sobreNome: 'Conti',
    });
  });
});
