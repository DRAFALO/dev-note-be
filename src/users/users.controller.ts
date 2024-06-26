import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto>{
    
    return this.usersService.create(createUserDto);
  }

  @Get()
  findByEmail(@Query('email') email: string): Promise<CreateUserDto>{
   
    return this.usersService.findByEmail(email);
  } 

  @Get('all')
  findAll(): Promise<CreateUserDto[]>{
   
    return this.usersService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto)
  :Promise<UpdateUserDto> {
    
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
