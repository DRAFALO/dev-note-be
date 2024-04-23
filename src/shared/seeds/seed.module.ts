import { CommandModule } from 'nestjs-command';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedController } from './seed.controller';
import { Article, ArticleSchema } from '~/articles/schema/article.schema';
import { SeedService } from '~/shared/seeds/seed.service';
import { User, UserSchema } from '~/users/schema/user.schema';
import { Tag, TagSchema } from '~/tags/schema/tag.schema';

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
      },
      {
        name: Tag.name,
        schema: TagSchema,
      },
    ]),
    CommandModule,
  ],
  providers: [SeedService],
  controllers: [SeedController],
})
export class SeedsModule {}
