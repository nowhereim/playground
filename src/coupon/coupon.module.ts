import { Module } from '@nestjs/common';
import { CouponController } from './presentation/controller';
import { CouponService } from './application/service';
import { CouponRepositoryImpl } from './infrastructure/coupon.repository';
import { CouponHistoryRepositoryImpl } from './infrastructure/couponhistory.repository';

@Module({
  imports: [],
  controllers: [CouponController],
  providers: [
    CouponService,
    {
      provide: 'CouponRepository',
      useClass: CouponRepositoryImpl,
    },
    {
      provide: 'CouponHistoryRepository',
      useClass: CouponHistoryRepositoryImpl,
    },
  ],
  exports: [],
})
export class CouponModule {}
