import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseModuleOptions } from "@nestjs/mongoose";
// import { SeedsModule } from '~/shared/seeds/seed.module';
import { LoggerMiddleware } from './loggers/logger.middleware';

export const connectDBFactory = (
  configService: ConfigService
): MongooseModuleOptions => {
  const MONGODB_URL = configService.get<string>('MONGODB_URL');
  console.log(MONGODB_URL);
  return {
    uri: MONGODB_URL,
  };
};



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: connectDBFactory,
    }),
    // SeedsModule
  ],
  exports: [ConfigModule, MongooseModule],
})

export class SharedModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
            .forRoutes('*');
  }
}
