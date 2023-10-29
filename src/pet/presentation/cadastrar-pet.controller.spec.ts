import { Test, TestingModule } from '@nestjs/testing';
import { CadastrarPetController } from './cadastrar-pet.controller';
import { CadastrarPetUseCase } from '@pet/app/use-cases';
import { ICadastrarPetUseCase } from '@pet/domain/use-cases/cadastrar-pet.interface';

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(cadastrarPetUseCase).toBeDefined();
  });
});
