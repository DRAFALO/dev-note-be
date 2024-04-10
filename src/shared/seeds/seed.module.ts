import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from '~/articles/schema/article.schema';
import { SeedService } from '~/shared/seeds/seed.service';
import { User, UserSchema } from '~/users/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Article.name,
        schema: ArticleSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      }
    ]),
    CommandModule
  ],
  providers: [
    SeedService,
  ],
})
export class SeedsModule { }