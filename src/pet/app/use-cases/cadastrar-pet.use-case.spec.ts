import { Test, TestingModule } from '@nestjs/testing';

import { TemperamentoPetEnum } from '@pet/domain/enums/temperamento.enum';
import { IPetRepository } from '@pet/domain/repositories';
import { ICadastrarPetUseCase } from '@pet/domain/use-cases';
import { PetRepository } from '@pet/infra/repositories';
import { CadastrarPetUseCaseProvider } from '@pet/main/providers';

import { CadastrarPetUseCase } from './cadastrar-pet.use-case';

describe('CadastrarPetUseCase', () => {
  let cadastrarPetUseCase: ICadastrarPetUseCase;
  let petRepository: IPetRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CadastrarPetUseCaseProvider,
        {
          provide: PetRepository,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    cadastrarPetUseCase = module.get<ICadastrarPetUseCase>(CadastrarPetUseCase);
    petRepository = module.get<IPetRepository>(PetRepository);

    jest.clearAllMocks();
  });
  it('deve estar definido', () => {
    expect(cadastrarPetUseCase).toBeDefined();
    expect(petRepository).toBeDefined();
  });

  it('deve cadastrar um pet', async () => {
    const petModelMock = {
      id: 'fakeUUid',
      nome: 'Gus',
      dataInclusao: new Date(),
      temperamento: TemperamentoPetEnum.DOCIL,
    };
    jest.spyOn(petRepository, 'save').mockResolvedValue(petModelMock);
    const result = await cadastrarPetUseCase.executar(petModelMock);

    expect(result).toEqual({
      id: petModelMock.id,
      nome: petModelMock.nome,
      temperamento: petModelMock.temperamento,
    });
    expect(petRepository.save).toBeCalledWith({
      nome: petModelMock.nome,
      temperamento: petModelMock.temperamento,
    });
  });
});
