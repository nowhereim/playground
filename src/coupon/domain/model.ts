import { Events, IssuedCouponEvent } from './issued-coupon.event';

export class Coupon {
  id: number;
  name: string;
  discountRate: number;
  expirationDate: Date;
  maxIsuueCount: number;
  issuedQuantity: number;
  couponHistory: CouponHistory[];
  version: number;

  constructor(args: CouponRequestType | CouponResponseType) {
    Object.assign(this, args);
  }

  issueCoupon() {
    if (this.issuedQuantity >= this.maxIsuueCount) {
      throw new Error('The coupon has reached the maximum issue count.');
    }
    this.issuedQuantity++;
  }

  issuedCouponEvent() {
    Events.raise(new IssuedCouponEvent(1, this.id));
  }
}

export class CouponHistory {
  id: number;
  couponId: number;
  userId: number;
  isUsed: boolean;
  usedAt: Date;

  constructor(args: CouponHistoryRequestType | CouponHistoryResponseType) {
    Object.assign(this, args);
  }
}

type CouponRequestType = {
  name: string;
  discountRate: number;
  expirationDate: Date;
  maxIsuueCount: number;
  issuedQuantity: number;
};

type CouponResponseType = {
  id: number;
  name: string;
  discountRate: number;
  expirationDate: Date;
  maxIsuueCount: number;
  issuedQuantity: number;
  version: number;
  couponHistory: {
    id: number;
    couponId: number;
    userId: number;
    isUsed: boolean;
    usedAt: Date;
  };
};

type CouponHistoryRequestType = {
  couponId: number;
  userId: number;
  isUsed: boolean;
  usedAt: Date;
};

type CouponHistoryResponseType = {
  id: number;
  couponId: number;
  userId: number;
  isUsed: boolean;
  usedAt: Date;
};

/* 하위 참조가 대원칙임. dip를 활용해서 도메인을 순수히 지키자. 도메인레이어는 화살표가없다. 도메인에 변환로직 있으면 안된다. 인프라에서 도메인 엔티티 바꾸고 프레젠테이션에서 디티오로변환하고 다 해야한다. */
