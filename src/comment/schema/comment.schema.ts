import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type CommentDocument = Comment & Document;
@Schema()
export class Comment extends Document {

  @Prop({ required: true, type: String })
  authorId: string;

  @Prop({ required: true, type: String })
  articleId: string;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({ required: true, type: Number })
  likesCount: number;

  @Prop({ required: true, type: Boolean })
  specialLike: boolean;

  @Prop({ required: true, type: Date })
  createdAt: Date;

  @Prop({ required: true, type: Date })
  updatedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);