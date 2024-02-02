import { AuthGuard } from '@auth/guard/auth.guard';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { AtualizarCadastroPetSitterUseCase } from '@pet-sitter/app/use-cases';
import { IAtualizarCadastroPetSitterUseCase } from '@pet-sitter/domain/use-cases';

import { JwtService } from '@infra/jwt';

import { TokenPayload } from '@core/contracts';

import { AtualizarCadastroPetSitterController } from './atualizar-cadastro-pet-sitter.controller';

describe('AtualizarCadastroPetSitterController', () => {
  let controller: AtualizarCadastroPetSitterController;
  let atualizarCadastroPetSitterUseCase: IAtualizarCadastroPetSitterUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtualizarCadastroPetSitterController],
      providers: [
        {
          provide: AtualizarCadastroPetSitterUseCase,
          useValue: {
            executar: jest.fn(),
          },
        },
        AuthGuard,
        JwtService,
        ConfigService,
      ],
    }).compile();

    controller = module.get<AtualizarCadastroPetSitterController>(
      AtualizarCadastroPetSitterController,
    );
    atualizarCadastroPetSitterUseCase =
      module.get<IAtualizarCadastroPetSitterUseCase>(
        AtualizarCadastroPetSitterUseCase,
      );

    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
    expect(atualizarCadastroPetSitterUseCase).toBeDefined();
  });

  it('deve atualizar o cadastro de um pet-sitter a partir do id de usuario', async () => {
    jest
      .spyOn(atualizarCadastroPetSitterUseCase, 'executar')
      .mockResolvedValue({
        id: 'FakeUUID',
        nome: 'Eduardo',
        dataNascimento: new Date('1995-12-05'),
        sobreNome: 'Conti',
        idPetSitter: 1,
      });

    const result = await controller.handle(
      {
        nome: 'Eduardo',
        dataNascimento: new Date('1995-12-05'),
        sobreNome: 'Conti',
      },
      {
        id: 'FakeUUID',
      } as TokenPayload,
    );

    expect(result).toBeUndefined();

    expect(atualizarCadastroPetSitterUseCase.executar).toBeCalledWith({
      id: 'FakeUUID',
      nome: 'Eduardo',
      dataNascimento: new Date('1995-12-05'),
      sobreNome: 'Conti',
    });
  });
});
