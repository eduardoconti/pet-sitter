import { Test, TestingModule } from '@nestjs/testing';

import { NovoAtendimentoUseCase } from '@atendimento/app/use-cases';
import { INovoAtendimentoUseCase } from '@atendimento/domain/use-cases';

import { NovoAtendimentoController } from './novo-atendimento.controller';

describe('NovoAtendimentoController', () => {
  let controller: NovoAtendimentoController;
  let novoAtendimentoUseCase: INovoAtendimentoUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NovoAtendimentoController],
      providers: [
        {
          provide: NovoAtendimentoUseCase,
          useValue: {
            executar: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<NovoAtendimentoController>(
      NovoAtendimentoController,
    );
    novoAtendimentoUseCase = module.get<INovoAtendimentoUseCase>(
      NovoAtendimentoUseCase,
    );

    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
    expect(novoAtendimentoUseCase).toBeDefined();
  });

  it('deve iniciar um novo atendimento', async () => {
    jest.spyOn(novoAtendimentoUseCase, 'executar').mockResolvedValue({
      id: 'FakeUUID',
    });

    const result = await controller.novoAtendimento();

    expect(result).toEqual({
      id: 'FakeUUID',
    });
  });
});
