import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MainModule } from '@main/main.module';
import { CadastrarPetUseCase } from '@pet/app/use-cases';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilter } from '@infra/filters';

describe('CadastrarPetController (e2e)', () => {
  let app: INestApplication;
  const endpoint = 'pet';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
    await app.init();
  });

  describe('/pet POST', () => {
    describe('CREATED (201)', () => {
      it('deve cadastrar um pet', async () => {
        return await request(app.getHttpServer())
          .post(`/${endpoint}`)
          .send({ nome: 'Gus' })
          .expect(201)
          .expect(({ body }) => {
            expect(body).toStrictEqual({
              id: expect.any(String),
              nome: 'Gus',
            });
          });
      });
    });

    describe('INTERNAL SERVER ERROR (500)', () => {
      it('deve lancar erro 500 quando falhar usecase', async () => {
        const useCase = app.get(CadastrarPetUseCase);

        jest
          .spyOn(useCase, 'executar')
          .mockRejectedValue(new Error('Erro interno'));
        return await request(app.getHttpServer())
          .post(`/${endpoint}`)
          .send({ nome: 'Gus' })
          .expect(500)
          .expect(({ body }) => {
            expect(body).toStrictEqual({
              message: 'Internal server error',
              statusCode: 500,
            });
          });
      });
    });
  });
});
