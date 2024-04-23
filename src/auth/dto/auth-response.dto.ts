import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty()
  user: {
    id: string;
    username: string;
    email: string;
    avatar: string;
    role: string;
  };

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}