import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '~/auth/guards/auth.guard';
import { User } from '~/users/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { UsersService } from '~/users/users.service';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    // constructor(private readonly authService: AuthService,private usersService:UsersService) { }

    // @HttpCode(HttpStatus.OK)
    // @Post('login')
    // signIn(@Body() signInDto: Record<string, any>) {
    //     return this.authService.signIn(signInDto.username, signInDto.password);
    // }

    // @UseGuards(AuthGuard)
    // @Get('profile')
    // getProfile(@Request() req) {
    //     return req.user;
    // }

    //   @Post('/signup')
    //   async createUser(
    //       @Body('password') password: string,
    //       @Body('username') username: string,
    //   ): Promise<User> {
    //       const saltOrRounds = 10;
    //       const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    //       const result = await this.usersService.create(
    //           username,
    //           hashedPassword,
    //       );
    //       return result;
    //   }



}
