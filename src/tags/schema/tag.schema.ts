import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Tag {
  @Prop({ required: true })
  label: string;
}

export type TagDocument = Tag & mongoose.Document;

export const TagSchema = SchemaFactory.createForClass(Tag);
