export class Coupon {
  id: number;
  name: string;
  discountRate: number;
  expirationDate: Date;
  maxIsuueCount: number;
  issuedQuantity: number;
  couponHistory: CouponHistory[];

  constructor(args: CouponRequestType | CouponResponseType) {
    Object.assign(this, args);
  }

  issueCoupon(userId: number) {
    if (this.issuedQuantity >= this.maxIsuueCount) {
      throw new Error('The coupon has reached the maximum issue count.');
    }
    this.issuedQuantity++;
    const couponHistory = new CouponHistory({
      couponId: this.id,
      userId,
      isUsed: false,
      usedAt: null,
    });
    this.couponHistory.push(couponHistory);

    return couponHistory;
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
