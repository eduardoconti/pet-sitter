import { INestApplication } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { DataSource } from 'typeorm';

import { CadastrarPetUseCase } from '@pet/app/use-cases';
import { TemperamentoPetEnum } from '@pet/domain/enums/temperamento.enum';
import { CadastrarPetDto } from '@pet/presentation';

import { AllExceptionsFilter } from '@infra/filters';

import { MainModule } from '@main/main.module';

describe('CadastrarPetController (e2e)', () => {
  let app: INestApplication;
  const endpoint = 'pet';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const httpAdapter = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
    await app.init();
  });

  afterAll(async () => {
    const connection = app.get(DataSource);
    await connection.destroy();
    await app.close();
  });

  describe('/pet POST', () => {
    const requestDto = new CadastrarPetDto();
    requestDto.nome = 'Gus';
    requestDto.temperamento = TemperamentoPetEnum.DOCIL;
    describe('CREATED (201)', () => {
      it('deve cadastrar um pet', async () => {
        return await request(app.getHttpServer())
          .post(`/${endpoint}`)
          .send(requestDto)
          .expect(201)
          .expect(({ body }) => {
            expect(body).toStrictEqual({
              id: expect.any(String),
              ...requestDto,
            });
          });
      });
    });

    describe('BAD REQUEST (400)', () => {
      it('deve lancar erro 400 quando nome fora do range', async () => {
        return await request(app.getHttpServer())
          .post(`/${endpoint}`)
          .send()
          .expect(400)
          .expect(({ body }) => {
            expect(body).toStrictEqual({
              title: 'Bad request',
              detail:
                'Nome do pet deve ser maior que 1 e menor que 128 carcateres',
              status: 400,
              path: '/pet',
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
          .send(requestDto)
          .expect(500)
          .expect(({ body }) => {
            expect(body).toStrictEqual({
              title: 'Internal Server Error',
              status: 500,
              path: '/pet',
            });
          });
      });
    });
  });
});
