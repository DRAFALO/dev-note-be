import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import {Comment} from './schema/comment.schema';
import { Response } from 'express';
@ApiTags('Comment')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto):Promise<Comment> {
    return this.commentService.create(createCommentDto);
  }

  @Get('all')
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<Comment> {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.commentService.remove(id);
    if (result === null) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    return res.status(200).json({ message: 'Comment removed successfully' });
  }
}
