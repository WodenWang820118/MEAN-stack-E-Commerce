import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get(':email')
  findByEmail(email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }

  @Post()
  create(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.create(userDto);
  }

  @Post(':login')
  login(
    @Body() loginDto: { email: string; passwordHash: string },
  ): Promise<{ email: string; token: string }> {
    console.log(`email: ${loginDto.email}`);
    console.log(`password: ${loginDto.passwordHash}`);
    return this.usersService.login(loginDto.email, loginDto.passwordHash);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: string, user: User): Promise<User> {
    return this.usersService.update(id, user);
  }

  @Put(':id/password')
  updatePassword(@Param('id') id: string, password: string): Promise<User> {
    return this.usersService.updatePassword(id, password);
  }
}
