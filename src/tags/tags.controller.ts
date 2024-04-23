import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './schema/tag.schema';
import { TagsService } from './tags.service';
import { UpdateTagDto } from './dto/update-tag.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

@ApiTags('Tag')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiOperation({ summary: 'Create a new tag' })
  @ApiResponse({
    status: 201,
    description: 'Create success.',
  })
  @ApiBody({ type: CreateTagDto })
  @Post()
  async create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagsService.create(createTagDto);
  }

  @ApiOperation({ summary: 'Get all tags' })
  @ApiResponse({
    status: 200,
    description: 'Find all successfully.',
  })
  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @ApiOperation({ summary: 'Search tags' })
  @ApiResponse({
    status: 200,
    description: 'Find successfully.',
  })
  @ApiQuery({
    name: 'label',
    required: true,
    type: String,
    description: 'Search label for tags',
  })
  @Get('search')
  findByTag(@Query('label') label: string) {
    return this.tagsService.findByNameTag(label);
  }

  @ApiOperation({ summary: 'Get tag by ID' })
  @ApiResponse({
    status: 200,
    description: 'Find by ID successfully.',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.tagsService.findById(id);
  }

  @ApiOperation({ summary: 'Update a tag' })
  @ApiResponse({
    status: 200,
    description: 'Update successfully.',
  })
  @ApiBody({ type: CreateTagDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(id, updateTagDto);
  }

  @ApiOperation({ summary: 'Delete a tag' })
  @ApiResponse({
    status: 200,
    description: 'Delete success.',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(id);
  }
}
