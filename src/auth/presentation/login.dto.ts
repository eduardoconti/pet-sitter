import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Email obrigatorio' })
  email!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Senha obrigatoria' })
  senha!: string;
}
