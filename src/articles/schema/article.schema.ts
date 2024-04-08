import { ApiProperty } from "@nestjs/swagger";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type ArticleDocument = Article & mongoose.Document;

export enum TypeArticle {
  Long = 'Long',
  Short = 'Short',
  Quote = 'Quote',
}

@Schema({ timestamps: true })
export class Article {

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  banner: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  emotion: string[];

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  createAt: string;

  @Prop({ required: true })
  updateAt: string;

  @Prop({ required: true })
  tag: number[];

  @Prop({ required: true })
  watchLater: boolean;

  @Prop({ required: true })
  @ApiProperty({ enum: ['Long', 'Short', 'Quote'] })
  role: TypeArticle;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);