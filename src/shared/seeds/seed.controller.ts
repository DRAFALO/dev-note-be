import { Controller, Get } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@ApiTags('Seed')
@Controller('seeds')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}
  @ApiOperation({ summary: 'Faker data' })
  @ApiResponse({
    status: 200,
    description: 'Faker data successfully.',
  })
  @Get('reset')
  reset() {
    return this.seedService.initialize();
  }
}
