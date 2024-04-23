import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';


export class SignUpDto {

  @ApiProperty({
    example: 'Test User',
  })
  @MaxLength(255)
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    example: 'Nhat',
  })
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({
    example: 'Nguyen',
  })
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({
    example: 'atest@email.com',
  })
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'Pass#123',
  })
  @MinLength(8, {
    message: 'password too short',
  })
  @MaxLength(20, {
    message: 'password too long',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsNotEmpty()
  readonly password: string;

}
