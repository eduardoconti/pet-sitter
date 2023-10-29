import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MainModule } from '@main/main.module';

describe('CadastrarPetController (e2e)', () => {
  let app: INestApplication;
  const endpoint = 'pet';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/pet POST', async () => {
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
