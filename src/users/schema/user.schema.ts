import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
export enum UserRole {
  Normal = 'Normal',
  Admin = 'Admin',
  Supporter = 'Supporter',
  User = "User",
}

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: false })
  password: string;

  @Prop({ required: true , unique:true})
  email: string;

  @Prop({ default: false, required: false })
  isRegisteredWithGoogle: boolean;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  birth: Date;

  @Prop()
  avatar: string;

  @Prop({ default: Date.now })
  createAt: Date;

  @Prop({ default: Date.now })
  updateAt: Date;

  @Prop({ type: String, enum: UserRole })
  role: UserRole;

  @Prop({ type: Object })
  follower: Record<string, any>;

  @Prop({ type: Object })
  following: Record<string, any>;

  @Prop()
  social_link: string;

  @Prop({ type: Object })
  location: Record<string, any>;

  @Prop([String])
  skills: string[];

  @Prop()
  tag_following: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
