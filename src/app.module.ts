import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { CommentModule } from './comment/comment.module';
import { SharedModule } from './shared/shared.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from '~/auth/auth.module';
import { RolesGuard } from '~/auth/guards/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { AppService } from '~/app.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true, // optional, if you want to access ConfigService across your app
    }),
    SharedModule,
    ArticlesModule,
    UsersModule,
    AuthModule,
    CommentModule,
    TagsModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppService,
  ],
})
export class AppModule { }
