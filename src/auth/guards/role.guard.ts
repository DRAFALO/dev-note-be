import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '~/shared/decorators/roles.decorator';
import { UserRole } from '~/users/schema/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    try {
      const { user } = context.switchToHttp().getRequest();
      const request = context.switchToHttp().getRequest();
      console.log(request.headers);
      const ROLE = UserRole.User;
      console.log(user)

      return requiredRoles.includes(ROLE);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}