import { StatusAtendimentoEnum } from '@atendimento/domain/enums';
import { AtendimentoModel } from '@atendimento/domain/models';
import { IAtendimentoRepository } from '@atendimento/domain/repositories';
import { INovoAtendimentoUseCase } from '@atendimento/domain/use-cases';
import { AtendimentoRepository } from '@atendimento/infra/repositories';
import { NovoAtendimentoUseCaseProvider } from '@atendimento/main/providers';
import { Test, TestingModule } from '@nestjs/testing';

import { NovoAtendimentoUseCase } from './novo-atendimento.use-case';

describe('NovoAtendimentoUseCase', () => {
  let cadastrarAtendimentoUseCase: INovoAtendimentoUseCase;
  let atendimentoRepository: IAtendimentoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NovoAtendimentoUseCaseProvider,
        {
          provide: AtendimentoRepository,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    cadastrarAtendimentoUseCase = module.get<INovoAtendimentoUseCase>(
      NovoAtendimentoUseCase,
    );
    atendimentoRepository = module.get<IAtendimentoRepository>(
      AtendimentoRepository,
    );

    jest.clearAllMocks();
  });
  it('deve estar definido', () => {
    expect(cadastrarAtendimentoUseCase).toBeDefined();
    expect(atendimentoRepository).toBeDefined();
  });

  it('deve iniciar um novo atendimento', async () => {
    const atendimentoModel: AtendimentoModel = {
      id: 'fakeUUid',
      status: StatusAtendimentoEnum.NOVO,
      dataInclusao: new Date(),
    };
    jest
      .spyOn(atendimentoRepository, 'save')
      .mockResolvedValue(atendimentoModel);
    const result = await cadastrarAtendimentoUseCase.executar();

    expect(result).toEqual({
      id: atendimentoModel.id,
    });

    expect(atendimentoRepository.save).toBeCalledWith({
      status: StatusAtendimentoEnum.NOVO,
    });
  });
});
