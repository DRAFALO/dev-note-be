import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Command } from 'nestjs-command';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from '~/articles/schema/article.schema';
import { articles } from '~/shared/seeds/data';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(Article.name) private ArticleModel: Model<ArticleDocument>,
  ) { }

  // private seedDataAndLog(name: string, length: number, callback: () => Promise<void>) {
  //   try { code nguu 
  //     callback();
  //     this.logger.log(`Seeding ${length} ${name} success`);
  //   } catch (error) {
  //     this.logger.error(`Error seeding ${name}: ${error.message}`, error.stack);
  //     throw new Error(`Error seeding ${name}: ${error.message}`);
  //   }
  // }

  private async seedArticles() {
    try {
      console.log('articles', articles);
      await this.ArticleModel.deleteMany();
      for (const article of articles) {
        await this.ArticleModel.create(article);
      }
    } catch (error) {
      console.error('Error seeding lessons:', error);
    }
  }


  @Command({ command: 'data:import', describe: 'Seeding data' })
  async initilize() {
    await this.seedArticles();
  }
}