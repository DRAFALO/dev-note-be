import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Comment,CommentDocument } from './schema/comment.schema';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>) { }

  async create(createCommentDto: CreateCommentDto):Promise<Comment> {
    const newComment = new this.commentModel(createCommentDto);
    newComment.createdAt = new Date();
    newComment.updatedAt = new Date();
    return newComment.save()
  }

  async findAll():Promise<Comment[]> {
    return this.commentModel.find().exec()
  }

  async findOne(id: string):Promise<Comment> {
    const _id = new Object(id); 
    return this.commentModel.findOne({ _id}).exec();
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const _id = new Object(id);
    const {content, likesCount, specialLike} = updateCommentDto;
    //check author ID === user ID 

    const dataUpdate = {
      ...updateCommentDto,
      content: content,
      likesCount: likesCount,
      specialLike: specialLike,
      updatedAt: new Date(),
     
    }
    const updatedComment = await this.commentModel.findOneAndUpdate({_id}, dataUpdate,{ new: true })
    return updatedComment;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      return null;
    }
    const _id = new Object(id);
    const comment = await this.commentModel.findOne({ _id }).exec();
    if (!comment) {
      return null;
    }
    return this.commentModel.deleteOne().where({ _id }).exec();
  }
}
