import { TypeArticle } from "../schema/article.schema";

export class CreateArticleDto {
  title: string;
  banner: string;
  content: string;
  type: TypeArticle;
  emotion: string[];
  tag: number[];
  watchLater: boolean;
  author: string;
  createAt: string; 
  updateAt: string;
  

}
