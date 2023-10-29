import { Test, TestingModule } from '@nestjs/testing';
import { ICadastrarPetUseCase } from '@pet/domain/use-cases';
import { CadastrarPetUseCase } from './cadastrar-pet.use-case';

describe('CadastrarPetUseCase', () => {
  let cadastrarPetUseCase: ICadastrarPetUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CadastrarPetUseCase],
    }).compile();

    cadastrarPetUseCase = module.get<ICadastrarPetUseCase>(CadastrarPetUseCase);
  });
  it('deve estar definido', () => {
    expect(cadastrarPetUseCase).toBeDefined();
  });
});
