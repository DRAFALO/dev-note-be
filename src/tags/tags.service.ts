import { CreateTagDto } from './dto/create-tag.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Tag, TagDocument } from './schema/tag.schema';
import { UpdateTagDto } from './dto/update-tag.dto';
@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagsModel: Model<TagDocument>) {}

  async create(createTagDto: CreateTagDto): Promise<TagDocument> {
    const createTag = await this.tagsModel.create(createTagDto);
    return createTag;
  }

  async findAll() {
    const findAllTag = await this.tagsModel.find();
    return findAllTag;
  }

  async findByNameTag(label: string) {
    const findTag = await this.tagsModel.find({ label });
    return findTag;
  }

  async findById(id: string): Promise<TagDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid tag ID.');
    const findOneTag = await this.tagsModel.findById(id);

    if (!findOneTag) throw new NotFoundException('Not tag.');

    return findOneTag;
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<TagDocument> {
    const { label } = updateTagDto;

    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid tag ID.');

    const foundTag = await this.tagsModel.findById(id);
    if (!foundTag) throw new NotFoundException('Not tag.');

    foundTag.label = label;

    const updatedTag = await foundTag.save();

    return updatedTag;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid tag ID.');

    const findOneTag = await this.tagsModel.findById(id);
    if (!findOneTag) throw new NotFoundException('Not tag.');

    await this.tagsModel.findByIdAndDelete(id);
  }
}
