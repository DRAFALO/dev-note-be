import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { CommentModule } from './comment/comment.module';
import { SharedModule } from './shared/shared.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true, // optional, if you want to access ConfigService across your app
    }),
    SharedModule,
    ArticlesModule,
    UsersModule,
    // AuthModule,
    CommentModule,
    TagsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
