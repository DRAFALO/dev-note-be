import { MongooseModuleOptions } from "@nestjs/mongoose";
import { ConfigService } from '@nestjs/config';

export const connectDBFactory = (
  configService: ConfigService
): MongooseModuleOptions => {
  const MONGODB_URL = configService.get<string>('MONGODB_URL');
  console.log(MONGODB_URL);
  return {
    uri: MONGODB_URL,
  };
};



