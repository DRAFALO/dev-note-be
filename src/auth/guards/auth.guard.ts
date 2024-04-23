import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_KEY')
      });
      // This also check the expired time of the token
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      console.log(payload);
      request['user'] = payload;
      return true;
    } catch (error) {
      console.error('Error verifying token', error);
      return false;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    console.log(request.headers);
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}