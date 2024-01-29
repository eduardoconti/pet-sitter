import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LoginUseCase } from '../app/use-cases/login.use-case';
import { LoginResponseDto } from './login-response.dto';
import { LoginDto } from './login.dto';

@ApiTags('auth')
@Controller('auth')
export class LoginController {
  constructor(private readonly loginUseCase: LoginUseCase) {}
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    const token = await this.loginUseCase.executar(loginDto);
    return { access_token: token };
  }
}
