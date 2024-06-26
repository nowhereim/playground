import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './libs/kafka/module';
import { DatabaseModule } from './libs/datasource/module';
import { ConfigModule } from '@nestjs/config';
import { CouponModule } from './coupon/coupon.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KafkaModule,
    DatabaseModule,
    CouponModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
