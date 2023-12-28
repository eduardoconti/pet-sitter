import { Test, TestingModule } from '@nestjs/testing';
import { CadastrarPetSitterUseCase } from '@pet-sitter/app/use-cases';
import { ICadastrarPetSitterUseCase } from '@pet-sitter/domain/use-cases';

import { CadastrarPetSitterController } from './cadastrar-pet-sitter.controller';

describe('CadastrarPetSitterController', () => {
  let controller: CadastrarPetSitterController;
  let cadastrarPetSitterUseCase: ICadastrarPetSitterUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CadastrarPetSitterController],
      providers: [
        {
          provide: CadastrarPetSitterUseCase,
          useValue: {
            executar: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CadastrarPetSitterController>(
      CadastrarPetSitterController,
    );
    cadastrarPetSitterUseCase = module.get<ICadastrarPetSitterUseCase>(
      CadastrarPetSitterUseCase,
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
    });

    const result = await controller.handle({
      nome: 'Eduardo',
      dataNascimento: new Date('1995-12-05'),
    });

    expect(result).toEqual({
      id: 'FakeUUID',
      nome: 'Eduardo',
      dataNascimento: new Date('1995-12-05'),
    });

    expect(cadastrarPetSitterUseCase.executar).toBeCalledWith({
      nome: 'Eduardo',
      dataNascimento: new Date('1995-12-05'),
    });
  });
});
