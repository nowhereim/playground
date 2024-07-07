import { Injectable } from '@nestjs/common';
import { Repository } from './base/base-repository';
import { CouponEntity } from './coupon.entity';
import { CouponRepository } from '../domain/repository';
import { Coupon } from '../domain/model';
import { EntityManager, EntityTarget } from 'typeorm';

@Injectable()
export class CouponRepositoryImpl
  extends Repository<CouponEntity>
  implements CouponRepository
{
  protected entityClass: EntityTarget<CouponEntity> = CouponEntity;
  async createCoupon(coupon: Coupon, tranjectionManager?: EntityManager) {
    const entity = new CouponEntity(coupon);
    await (tranjectionManager ? tranjectionManager : this.getManager()).save(
      this.entityClass,
      entity,
    );
  }
  async updateCoupon(coupon: Coupon, transactionManager?: EntityManager) {
    const entity = new CouponEntity(coupon);
    try {
      await (transactionManager ? transactionManager : this.getManager()).save(
        this.entityClass,
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
      .createQueryBuilder(this.entityClass, 'coupon')
      .where('coupon.id = :couponId', { couponId })
      .getOne();

    return new Coupon(entity);
  }
}
