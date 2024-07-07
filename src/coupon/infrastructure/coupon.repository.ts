import { Injectable } from '@nestjs/common';
import { Repository } from './base/base-repository';
import { CouponEntity } from './coupon.entity';
import { CouponRepository } from '../domain/repository';
import { Coupon } from '../domain/model';
import { EntityManager } from 'typeorm';

@Injectable()
export class CouponRepositoryImpl
  extends Repository
  implements CouponRepository
{
  async createCoupon(coupon: Coupon, tranjectionManager?: EntityManager) {
    const entity = new CouponEntity(coupon);
    await (tranjectionManager ? tranjectionManager : this.getManager()).save(
      entity,
    );
  }
  async updateCoupon(coupon: Coupon, transactionManager?: EntityManager) {
    const entity = new CouponEntity(coupon);
    try {
      await (transactionManager ? transactionManager : this.getManager()).save(
        entity,
      );
    } catch (e) {
      console.log(e);
    }
  }
  async getCoupon(couponId: number, tranjectionManager?: EntityManager) {
    const entity = await (
      tranjectionManager ? tranjectionManager : this.getManager()
    )
      .createQueryBuilder(CouponEntity, 'coupon')
      .where('coupon.id = :couponId', { couponId })
      .getOne();

    return new Coupon(entity);
  }
}
