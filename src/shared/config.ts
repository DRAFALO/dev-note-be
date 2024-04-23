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


export const config = {
  mode: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  host: process.env.HOST || 'localhost',
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/dev-note',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  refreshSecrect: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
  googleClientID: process.env.GOOGLE_AUTH_CLIENT_ID || 'YOUR_CLIENT_ID',
}
