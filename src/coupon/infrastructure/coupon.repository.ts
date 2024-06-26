import { Injectable } from '@nestjs/common';
import { Repository } from 'src/libs/repository/abstract-repository';
import { CouponEntity } from './coupon.entity';
import { CouponRepository } from '../domain/repository';
import { Coupon } from '../domain/model';
import { EntityManager } from 'typeorm';

@Injectable()
export class CouponRepositoryImpl
  extends Repository<CouponEntity>
  implements CouponRepository
{
  protected entityClass = CouponEntity;

  async createCoupon(coupon: Coupon, tranjectionManager?: EntityManager) {
    const entity = new CouponEntity({
      id: coupon.id,
      name: coupon.name,
      discountRate: coupon.discountRate,
      expirationDate: coupon.expirationDate,
      maxIsuueCount: coupon.maxIsuueCount,
      issuedQuantity: coupon.issuedQuantity,
    });
    await (tranjectionManager ? tranjectionManager : this.getManager()).save(
      entity,
    );
  }
  async updateCoupon(coupon: Coupon, tranjectionManager?: EntityManager) {
    const entity = new CouponEntity({
      id: coupon.id,
      name: coupon.name,
      discountRate: coupon.discountRate,
      expirationDate: coupon.expirationDate,
      maxIsuueCount: coupon.maxIsuueCount,
      issuedQuantity: coupon.issuedQuantity,
    });
    await (tranjectionManager ? tranjectionManager : this.getManager()).save(
      entity,
    );
  }
  async getCoupon(couponId: number, tranjectionManager?: EntityManager) {
    const entity = await (
      tranjectionManager ? tranjectionManager : this.getManager()
    ).findOne(CouponEntity, {
      where: { id: couponId },
      lock: { mode: 'optimistic', version: 0 },
    });
    return new Coupon(entity);
  }
}
