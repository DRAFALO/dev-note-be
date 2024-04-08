import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { TagsModule } from './tags/tags.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SharedModule,
    ArticlesModule,
    UsersModule,
    AuthModule,
    CommentModule,
    TagsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
