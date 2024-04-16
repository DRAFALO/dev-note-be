import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  // Passwords will contain at least 1 upper case letter, 1 lower case letter and 1 number
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak (must contain at least 1 upper case letter, 1 lower case letter and 1 number)',
  })
  password!: string;


  @ApiProperty({
    required: true,
    type: String,
  })
  @IsEmail()
  email:string;
}
