import { MailerService } from './mailer-service';
import { IEmailService, ITransporter } from '@core/mailer.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { ApmService } from '@infra/apm/apm.service';

const makeFakeBody = {
  body: '<h1>fakebody</h1>',
  context: 'fakeContext',
  from: 'fakeFrom@gmail.com',
  subject: '',
  to: 'fakeTo@gmail.com',
};

describe('MailerService', () => {
  let mailerService: IEmailService;
  let transporter: ITransporter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: MailerService,
          useFactory(transporter: ITransporter, apmServoce: ApmService) {
            return new MailerService(transporter, apmServoce);
          },
          inject: ['TRANSPORTER', ApmService],
        },
        {
          provide: 'TRANSPORTER',
          useValue: {
            sendMail: jest.fn(),
          },
        },
        ApmService,
      ],
    }).compile();

    mailerService = module.get(MailerService);
    transporter = module.get('TRANSPORTER');

    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(mailerService).toBeDefined();
    expect(transporter).toBeDefined();
  });
  it('deve executar com sucesso', async () => {
    await mailerService.send(makeFakeBody);
    expect(transporter.sendMail).toBeCalledWith({
      from: 'fakeFrom@gmail.com',
      html: '<h1>fakebody</h1>',
      subject: '',
      to: 'fakeTo@gmail.com',
    });
  });
});
