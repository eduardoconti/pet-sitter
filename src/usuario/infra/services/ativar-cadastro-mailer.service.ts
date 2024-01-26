import { EnvironmentVariables } from '@main/config';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '../../../infra/mailer/mailer-service';
import { Injectable } from '@nestjs/common';
import { IAtivarCadastroMailerService } from '@usuario/app/services';

@Injectable()
export class AtivarCadastroMailerService
  implements IAtivarCadastroMailerService
{
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly mailerService: MailerService,
  ) {}

  send(email: string, id: string): void {
    const link = `${this.configService.getOrThrow(
      'APP_HOST',
    )}/ativar-cadastro?id=${id}`;

    this.mailerService.send({
      body: `
      <p>Olá,</p>
      <p>Obrigado por se cadastrar em nosso site. Para ativar o seu cadastro, clique no link abaixo:</p>
      <a href="${link}" target="_blank">Ativar Cadastro</a>
      <p>Se o botão não funcionar, copie e cole o seguinte link em seu navegador:</p>
      <p>${link}</p>
      <p>Atenciosamente,<br>Pet sitters</p>
    `,
      context: 'ATIVAR_CADASTRO',
      from: this.configService.getOrThrow('MAILER_USER'),
      to: email,
      subject: 'Ativar cadastro pet sitter',
    });
  }
}
