import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private numberOfCalls = 0;
  private readonly logger = new Logger(AppService.name);

  @Cron('*/10 * * * *')
  handleCron() {
    this.numberOfCalls++;
    this.logger.debug('Called every 10 minutes');
    this.logger.debug(`Number of calls: ${this.numberOfCalls}`);
  }

}
