import { StatusAtendimentoEnum } from '@atendimento/domain/enums';
import { AtendimentoModel } from '@atendimento/domain/models';
import { IAtendimentoRepository } from '@atendimento/domain/repositories';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AtendimentoSchema } from '../schemas';
import { AtendimentoRepository } from './pet-sitter.repository';

describe('AtendimentoRepository', () => {
  let atendimentoRepository: IAtendimentoRepository;
  let atendimentoRepositoryOrm: Repository<AtendimentoModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AtendimentoRepository,
        {
          provide: getRepositoryToken(AtendimentoSchema),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    atendimentoRepository = module.get<IAtendimentoRepository>(
      AtendimentoRepository,
    );
    atendimentoRepositoryOrm = module.get<Repository<AtendimentoModel>>(
      getRepositoryToken(AtendimentoSchema),
    );

    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(atendimentoRepository).toBeDefined();
    expect(atendimentoRepositoryOrm).toBeDefined();
  });

  describe('save', () => {
    it('deve salvar um atendimento', async () => {
      const data = Date.now();
      const atendimentoModelMock: AtendimentoModel = {
        id: '1',
        idPetSitter: '2',
        idTutor: '3',
        dataInclusao: data,
        status: StatusAtendimentoEnum.NOVO,
      };
      jest
        .spyOn(atendimentoRepositoryOrm, 'save')
        .mockResolvedValue(atendimentoModelMock);

      const result = await atendimentoRepository.save(atendimentoModelMock);

      expect(result).toBe(atendimentoModelMock);
    });
  });
});
