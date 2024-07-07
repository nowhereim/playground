import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { CouponController } from './presentation/controller';
import { CouponService } from './application/service';
import { CouponRepositoryImpl } from './infrastructure/coupon.repository';
import { CouponHistoryRepositoryImpl } from './infrastructure/couponhistory.repository';
import { EventRepositoryImpl } from './infrastructure/event/event.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Events } from './domain/issued-coupon.event';
import { IEventRepository } from './domain/repository';

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
    {
      provide: 'IEventRepository',
      useClass: EventRepositoryImpl,
    },
  ],
  exports: [],
})
export class CouponModule implements OnModuleInit {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
  ) {}

  onModuleInit() {
    Events.initialize(this.eventEmitter, this.eventRepository);
  }
}
