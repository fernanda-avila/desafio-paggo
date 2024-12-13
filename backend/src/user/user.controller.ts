import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { LoginUserDto } from './login-user.dto';  // Novo DTO

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()  
  async createUser(@Body() body: CreateUserDto) {
    console.log('Requisição recebida:', body);  
    return this.userService.createUser(body.email, body.password, body.name);
  }

  @Post('login')  // Adicionando a rota de login
  async loginUser(@Body() body: LoginUserDto) {  // Use LoginUserDto aqui
    console.log('Requisição de login recebida:', body);
    return this.userService.loginUser(body.email, body.password);  // Verifica credenciais
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
