import { Test, TestingModule } from '@nestjs/testing';

import { CadastrarPetUseCase } from '@pet/app/use-cases';
import { TemperamentoPetEnum } from '@pet/domain/enums/temperamento.enum';
import { ICadastrarPetUseCase } from '@pet/domain/use-cases/cadastrar-pet.interface';

import { CadastrarPetController } from './cadastrar-pet.controller';

describe('CadastrarPetController', () => {
  let controller: CadastrarPetController;
  let cadastrarPetUseCase: ICadastrarPetUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CadastrarPetController],
      providers: [
        {
          provide: CadastrarPetUseCase,
          useValue: {
            executar: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CadastrarPetController>(CadastrarPetController);
    cadastrarPetUseCase = module.get<ICadastrarPetUseCase>(CadastrarPetUseCase);

    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
    expect(cadastrarPetUseCase).toBeDefined();
  });

  it('deve cadastrar um pet', async () => {
    jest.spyOn(cadastrarPetUseCase, 'executar').mockResolvedValue({
      id: 'FakeUUID',
      nome: 'Gus',
      temperamento: TemperamentoPetEnum.DOCIL,
    });

    const result = await controller.cadastrarPet({
      nome: 'Gus',
      temperamento: TemperamentoPetEnum.DOCIL,
    });

    expect(result).toEqual({
      id: 'FakeUUID',
      nome: 'Gus',
      temperamento: TemperamentoPetEnum.DOCIL,
    });
  });
});
