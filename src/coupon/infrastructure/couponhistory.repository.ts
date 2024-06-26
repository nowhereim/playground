import { Injectable } from '@nestjs/common';
import { Repository } from 'src/libs/repository/abstract-repository';
import { CouponHistoryEntity } from './coupon.entity';
import { CouponHistoryRepository } from '../domain/repository';
import { EntityManager, ObjectType } from 'typeorm';
import { CouponHistory } from '../domain/model';

@Injectable()
export class CouponHistoryRepositoryImpl
  extends Repository<CouponHistoryEntity>
  implements CouponHistoryRepository
{
  protected entityClass: ObjectType<CouponHistoryEntity>;

  createCouponHistory: (
    couponHistory: CouponHistory,
    transactionalEntityManager?: EntityManager,
  ) => Promise<CouponHistory>;
  updateCouponHistory: (
    couponHistory: CouponHistory,
    transactionalEntityManager?: EntityManager,
  ) => Promise<CouponHistory>;
}
