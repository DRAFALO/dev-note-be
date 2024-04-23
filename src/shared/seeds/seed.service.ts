import { Command } from 'nestjs-command';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RandomAdmin } from './fakerAdmin';
import { RandomArticles } from './fakerArticles';
import { RandomTags } from './fakerTags';
import { RandomUser } from './fakerUser';
import { Article, ArticleDocument } from '~/articles/schema/article.schema';
import { User, UserDocument } from '~/users/schema/user.schema';
import { Tag, TagDocument } from '~/tags/schema/tag.schema';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(Article.name) private ArticleModel: Model<ArticleDocument>,
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectModel(Tag.name) private TagModel: Model<TagDocument>,
  ) {}

  private async seedArticles() {
    try {
      for (const article of RandomArticles) {
        await this.ArticleModel.create(article);
      }
    } catch (error) {
      console.error('Error seeding lessons:', error);
    }
  }

  private async seedUser() {
    {
      try {
        for (const user of RandomUser) {
          await this.UserModel.create(user);
        }
      } catch (error) {
        console.error('Error seeding lessons:', error);
      }
    }
  }

  private async seedAdmin() {
    {
      try {
        for (const admin of RandomAdmin) {
          await this.UserModel.create(admin);
        }
      } catch (error) {
        console.error('Error seeding lessons:', error);
      }
    }
  }
  private async seedTags() {
    {
      try {
        for (const tag of RandomTags) {
          await this.TagModel.create(tag);
        }
      } catch (error) {
        console.error('Error seeding lessons:', error);
      }
    }
  }

  private async removeModels() {
    await this.ArticleModel.deleteMany();
    await this.TagModel.deleteMany();
    await this.UserModel.deleteMany();
  }

  @Command({ command: 'data:import', describe: 'Seeding data' })
  async initialize() {
    await this.removeModels();
    await this.seedUser();
    await this.seedAdmin();
    await this.seedTags();
    await this.seedArticles();
  }
}
