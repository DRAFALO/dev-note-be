import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
export class CreateTagDto {
  @ApiProperty({
    description: 'The label of the tag',
    minLength: 6,
    maxLength: 50,
    required: true,
    type: String,
  })
  @IsString()
  @Length(6, 50)
  label: string;
}
