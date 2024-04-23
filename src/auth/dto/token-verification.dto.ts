
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class TokenVerificationDto {

  @ApiProperty({
    example: 'GOOGLE CREDENTIAL TOKEN FROM FRONTEND',
  })
  @IsString()
  @IsNotEmpty()
  readonly token: string;
}

export default TokenVerificationDto;