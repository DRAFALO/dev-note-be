import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article, ArticleDocument } from '~/articles/schema/article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ArticlesService {

  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>
  ) { }

  create(createArticleDto: CreateArticleDto){

    return 'This action adds a new article';
  }

  async findAll() {
    const article = await this.articleModel.find({});
    return article;
  }

  async findOne(id: number) {

    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {

    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
