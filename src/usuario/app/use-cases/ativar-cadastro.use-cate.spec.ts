import { Test, TestingModule } from '@nestjs/testing';

import { StatusUsuario } from '@usuario/domain/enums';
import { IUsuarioRepository } from '@usuario/domain/repositories';
import { IAtivarCadastroUseCase } from '@usuario/domain/use-cases';
import { UsuarioRepository } from '@usuario/infra/repositories';
import { ProvideAtivarCadastroUseCase } from '@usuario/usuario.module';

import { AtivarCadastroUseCase } from './ativar-cadastro.use-case';

const mockUsuario = {
  id: 'fakeuUID',
  email: 'email',
  nome: 'nome',
  senha: '1234',
  sobreNome: 'sobrenome',
  dataInclusao: new Date(),
  dataNascimento: new Date(),
  status: StatusUsuario.PENDENTE_ATIVACAO,
};
describe('AtivarCadastroUseCase', () => {
  let ativarCadastroUseCase: IAtivarCadastroUseCase;
  let usuarioRepository: IUsuarioRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvideAtivarCadastroUseCase,
        {
          provide: UsuarioRepository,
          useValue: {
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    ativarCadastroUseCase = module.get<IAtivarCadastroUseCase>(
      AtivarCadastroUseCase,
    );
    usuarioRepository = module.get<IUsuarioRepository>(UsuarioRepository);

    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(ativarCadastroUseCase).toBeDefined();
    expect(usuarioRepository).toBeDefined();
  });

  it('deve ativar registro PENDENTE', async () => {
    jest.spyOn(usuarioRepository, 'findById').mockResolvedValue(mockUsuario);

    const resultado = await ativarCadastroUseCase.executar('fakeUUID');

    expect(usuarioRepository.update).toBeCalledWith({
      id: 'fakeUUID',
      status: StatusUsuario.ATIVO,
    });
    expect(resultado).toBe(
      `${mockUsuario.nome} ${mockUsuario.sobreNome}, Obrigado por se cadastrar em nosso site!`,
    );
  });

  it.each([StatusUsuario.ATIVO, StatusUsuario.SUSPENSO])(
    'nao deve ativar registro quando status for ATIVO ou SUSPENSO',
    async (status: StatusUsuario) => {
      jest
        .spyOn(usuarioRepository, 'findById')
        .mockResolvedValue({ ...mockUsuario, status });

      const resultado = await ativarCadastroUseCase.executar('fakeUUID');

      expect(usuarioRepository.update).not.toBeCalled();
      expect(resultado).toBe(
        `${mockUsuario.nome} ${mockUsuario.sobreNome}, Obrigado por se cadastrar em nosso site!`,
      );
    },
  );
});
