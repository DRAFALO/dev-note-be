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

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const newArticle = new this.articleModel(createArticleDto);
    newArticle.createAt = new Date();
    newArticle.updateAt = new Date();
    console.log(newArticle);
    return newArticle.save();
  }

  async findAll(): Promise<Article[]> {
    const article = await this.articleModel.find({});
    return article;
  }


  async findOne(id: string): Promise<Article> {
    const _id = new Object(id);
    const article = this.articleModel.findOne({ _id });
    return article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto): Promise<Article> {
    const _id = new Object(id);
    const updatedArticle = await this.articleModel.findOneAndUpdate({ _id }, updateArticleDto, { new: true })
    return updatedArticle;
  }

  remove(id: string) {
    const _id = new Object(id);
    return this.articleModel.deleteOne().where({ _id }).exec();
  }
}
