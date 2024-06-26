import { Inject, Injectable } from '@nestjs/common';
import {
  CouponHistoryRepository,
  CouponRepository,
} from '../domain/repository';
import { Coupon } from '../domain/model';
import { DataSource } from 'typeorm';
import { CreateCouponDto, IssueCouponDto } from './dto/dto';

@Injectable()
export class CouponService {
  constructor(
    @Inject('CouponRepository')
    private readonly couponRepository: CouponRepository,
    @Inject('CouponHistoryRepository')
    private readonly couponHistoryRepository: CouponHistoryRepository,

    private readonly dataSource: DataSource,
  ) {}

  async createCoupon(args: CreateCouponDto) {
    const coupon = new Coupon(args);
    await this.couponRepository.createCoupon(coupon);
  }

  async issueCoupon(args: IssueCouponDto) {
    await this.dataSource
      .createEntityManager()
      .transaction(async (transactionalEntityManager) => {
        const coupon = await this.couponRepository.getCoupon(
          args.couponId,
          transactionalEntityManager,
        );
        const couponHistory = coupon.issueCoupon(args.userId);
        await this.couponRepository.updateCoupon(
          coupon,
          transactionalEntityManager,
        );
        await this.couponHistoryRepository.createCouponHistory(
          couponHistory,
          transactionalEntityManager,
        );
      });
  }

  async updateCoupon(args: any) {
    const coupon = new Coupon(args);
    await this.couponRepository.updateCoupon(coupon);
  }
}
