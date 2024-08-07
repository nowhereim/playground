import { EntityManager } from 'typeorm';
import { Coupon, CouponHistory } from './model';

export interface CouponRepository {
  createCoupon: (
    coupon: Coupon,
    transactionalEntityManager?: EntityManager,
  ) => Promise<void>;
  updateCoupon: (
    coupon: Coupon,
    transactionalEntityManager?: EntityManager,
  ) => Promise<void>;
  getCoupon: (
    couponId: number,
    transactionalEntityManager?: EntityManager,
  ) => Promise<Coupon>;

  getTransactionManager: () => EntityManager;
}

export interface CouponHistoryRepository {
  createCouponHistory: (
    couponHistory: CouponHistory,
    transactionalEntityManager?: EntityManager,
  ) => Promise<CouponHistory>;
  updateCouponHistory: (
    couponHistory: CouponHistory,
    transactionalEntityManager?: EntityManager,
  ) => Promise<CouponHistory>;
}

// export interface ITransactionManager {
//   (): EntityManager;
// }

export interface IEventRepository {
  saveEvent: (args: {
    events: any[];
    transactionalEntityManager?: EntityManager;
  }) => Promise<void>;
}
