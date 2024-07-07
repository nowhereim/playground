import { Inject, Injectable } from '@nestjs/common';
import {
  CouponHistoryRepository,
  CouponRepository,
  IEventRepository,
} from '../domain/repository';
import { Coupon, CouponHistory } from '../domain/model';
import { CreateCouponDto, IssueCouponDto } from './dto/dto';
import { IssueCouponEventModel } from './event.test';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CouponService {
  constructor(
    @Inject('CouponRepository')
    private readonly couponRepository: CouponRepository,
    @Inject('CouponHistoryRepository')
    private readonly couponHistoryRepository: CouponHistoryRepository,
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
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
        coupon.issueCoupon();
        await this.couponRepository.updateCoupon(
          coupon,
          transactionalEntityManager,
        );
        // console.log(new IssueCouponEventModel({ model: coupon, args }));
        // /* 근데 이렇게 하면 애그리거트 루트를 통한 생성이 아니게 되버린다. */
        // this.eventRepository.saveEvent({
        //   events: [
        //     new IssueCouponEventModel({
        //       model: coupon,
        //       args,
        //     }),
        //   ],
        // });
        coupon.issuedCouponEvent();
      });
  }

  @OnEvent('IssueCouponEvent')
  async handleOrderCreatedEvent(event: IssueCouponEventModel) {
    try {
      console.log('잉?');
      await this.couponRepository
        .getTransactionManager()
        .transaction(async (transactionalEntityManager) => {
          const { model, args } = event;
          const couponHistory = new CouponHistory({
            couponId: model.id,
            userId: args.userId,
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
  async handleIssuedCouponEvent(event: IssueCouponEventModel) {
    try {
      console.log('받음?');
      console.log(event);
    } catch (error) {
      console.error(error);
    }
  }
}
/* 불리언 자체를 쓰기보단 풍부한 객체를 써라. 왜냐하면 변화에 대응하기 좋아진다. */
