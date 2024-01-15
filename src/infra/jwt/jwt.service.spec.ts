import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import jwt from 'jsonwebtoken';

import { IJWtService } from '@core/contracts';

import { JwtService } from './jwt.service';
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue(true),
  sign: jest.fn().mockReturnValue('mocked-jwt-payload'),
  decode: jest.fn().mockReturnValue({ id: 'Fake', nome: 'FakeNome' }),
}));
describe('JwtService', () => {
  let jwtService: IJWtService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn().mockReturnValue('jwtsecret'),
          },
        },
      ],
    }).compile();

    jwtService = module.get<IJWtService>(JwtService);

    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(jwtService).toBeDefined();
  });

  it('deve gerar um token', () => {
    const token = jwtService.sign<{
      fake: string;
    }>({
      fake: 'fake',
    });

    expect(token).toBeDefined();
  });

  it('deve passar na verificacao', () => {
    const verification = jwtService.verify('faketoken');
    expect(verification).toBeTruthy();
  });

  it('nao deve passar na verificacao quando acontece um erro', () => {
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error('');
    });
    const verification = jwtService.verify('faketoken');
    expect(verification).toBeFalsy();
  });

  it('deve decodar um token', () => {
    const decoded = jwtService.decode('faketoken');
    expect(decoded).toEqual({ id: 'Fake', nome: 'FakeNome' });
  });
});
