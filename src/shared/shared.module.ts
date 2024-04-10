import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedsModule } from '~/shared/seeds/seed.module';
import { LoggerMiddleware } from './loggers/logger.middleware';
import { connectDBFactory } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local'],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: connectDBFactory,
    }),
    SeedsModule
  ],
  exports: [ConfigModule, MongooseModule],
})

export class SharedModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
            .forRoutes('*');
  }
}
