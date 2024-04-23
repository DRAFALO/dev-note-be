import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse, ApiTags
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthResponseDto } from '~/auth/dto/auth-response.dto';
import { SignInDto } from '~/auth/dto/sign-in.dto';
import { SignUpDto } from '~/auth/dto/sign-up.dto';
import TokenVerificationDto from '~/auth/dto/token-verification.dto';
import { AuthGuard } from '~/auth/guards/auth.guard';
import { RolesGuard } from '~/auth/guards/role.guard';
import { Roles } from '~/shared/decorators/roles.decorator';
import { UserRole } from '~/users/schema/user.schema';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.User)
    @UseGuards(AuthGuard, RolesGuard)
    @Get('admin')
    async admin() {
        //get refresh token from cookie
        return { message: 'This is a admin route' };
    }


    @HttpCode(HttpStatus.OK)
    @Get('new-token')
    async newToken(@Req() req: Request, @Res() res: Response) {
        //get refresh token from cookie
        const refreshToken = req.cookies.refreshToken;
        const payload = await this.authService.getNewTokens(refreshToken);
        res.cookie('refreshToken', payload.refreshToken, { httpOnly: true });
        res.status(200).send({ accessToken: payload.accessToken });
    }

    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    async signIn(@Res() res: Response, @Body() signInDto: SignInDto) {
        const payload: AuthResponseDto = await this.authService.signIn(signInDto);
        // Set the cookie
        res.cookie('refreshToken', payload.refreshToken, { httpOnly: true });
        res.status(200).send(payload);
    }

    //Note if use @Res, we couldn't use return
    @Post('google-auth')
    async googleAuth(@Res() res: Response, @Body() tokenVerificationDto: TokenVerificationDto) {
        const payload: AuthResponseDto = await this.authService.googleAuth(tokenVerificationDto);
        res.cookie('refreshToken', payload.refreshToken, { httpOnly: true });
        res.status(200).send(payload);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('sign-up')
    @ApiCreatedResponse({ description: 'User has been successfully signed up' })
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }

    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'User has been successfully signed out' })
    @Get('sign-out')
    signOut(@Res() res: Response) {
        res.clearCookie('refreshToken');
        res.status(200).send({ message: 'User has been successfully signed out' });
    }


}

