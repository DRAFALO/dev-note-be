import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '~/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/role.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
    })
  ],
  providers: [AuthService, RolesGuard],
  controllers: [AuthController],
  exports: [
    JwtModule
  ]
})
export class AuthModule { } 
