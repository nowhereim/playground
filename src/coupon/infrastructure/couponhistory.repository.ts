import { Injectable } from '@nestjs/common';
import { Repository } from './base/base-repository';
import { CouponHistoryEntity } from './coupon.entity';
import { CouponHistoryRepository } from '../domain/repository';
import { EntityManager } from 'typeorm';
import { CouponHistory } from '../domain/model';

@Injectable()
export class CouponHistoryRepositoryImpl
  extends Repository
  implements CouponHistoryRepository
{
  async createCouponHistory(
    args: CouponHistory,
    transactionalEntityManager?: EntityManager,
  ) {
    const entity = new CouponHistoryEntity(args);
    await (
      transactionalEntityManager
        ? transactionalEntityManager
        : this.getManager()
    ).save(entity);

    return new CouponHistory(entity);
  }
  updateCouponHistory: (
    couponHistory: CouponHistory,
    transactionalEntityManager?: EntityManager,
  ) => Promise<CouponHistory>;
}
