import { Inject, Injectable } from '@nestjs/common';
import { CouponHistoryRepository, CouponRepository } from './repository';
import { Coupon, CouponHistory } from './model';
import { CreateCouponDto, IssueCouponDto } from '../application/dto/dto';
import { OnEvent } from '@nestjs/event-emitter';
import { IssuedCouponEvent } from './events/issued-coupon.event';

@Injectable()
export class CouponService {
  constructor(
    @Inject('CouponRepository')
    private readonly couponRepository: CouponRepository,
    @Inject('CouponHistoryRepository')
    private readonly couponHistoryRepository: CouponHistoryRepository,
  ) {}

  async createCoupon(args: CreateCouponDto) {
    const coupon = new Coupon(args);
    await this.couponRepository.createCoupon(coupon);
  }

  async issueCoupon(args: IssueCouponDto) {
    await this.couponRepository
      .getTransactionManager()
      .transaction(async (transactionalEntityManager) => {
        const coupon = await this.couponRepository.getCoupon(
          args.couponId,
          transactionalEntityManager,
        );
        coupon.issueCoupon({ userId: args.userId });
        await this.couponRepository.updateCoupon(
          coupon,
          transactionalEntityManager,
        );

        coupon.releaseEvent();
      });
  }

  async expireCoupon() {}

  @OnEvent('IssuedCouponEvent')
  async handleOrderCreatedEvent(event: IssuedCouponEvent) {
    try {
      await this.couponRepository
        .getTransactionManager()
        .transaction(async (transactionalEntityManager) => {
          const { userId, couponId } = event;
          const couponHistory = new CouponHistory({
            couponId,
            userId,
            isUsed: false,
            usedAt: null,
          });
          await this.couponHistoryRepository.createCouponHistory(
            couponHistory,
            transactionalEntityManager,
          );
        });
    } catch (error) {
      console.error(error);
    }
  }

  @OnEvent('IssuedCouponEvent')
  async handleIssuedCouponEvent(event: IssuedCouponEvent) {
    try {
      console.log('받음?');
      console.log(event);
    } catch (error) {
      console.error(error);
    }
  }
}
/* 불리언 자체를 쓰기보단 풍부한 객체를 써라. 왜냐하면 변화에 대응하기 좋아진다. -> 프리미티브타입 반환을 지양 */
