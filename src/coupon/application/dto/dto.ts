export class CreateCouponDto {
  name: string;
  discountRate: number;
  expirationDate: Date;
  maxIsuueCount: number;
  issuedQuantity: number;
}

export class IssueCouponDto {
  userId: number;
  couponId: number;
}
