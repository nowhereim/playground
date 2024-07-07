import { BaseEntity } from 'src/coupon/infrastructure/base/base-entity';
import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

@Entity()
export class CouponEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  discountRate: number;

  @Column()
  expirationDate: Date;

  //발행 가능한 쿠폰 수량
  @Column()
  maxIsuueCount: number;

  //발행된 쿠폰 수량
  @Column()
  issuedQuantity: number;

  @VersionColumn()
  version: number;

  constructor(args: Partial<CouponEntity>) {
    super();
    Object.assign(this, args);
  }
}

@Entity()
export class CouponHistoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  couponId: number;

  @Column()
  userId: number;

  @Column({ default: false })
  isUsed: boolean;

  @Column({ nullable: true })
  usedAt: Date;

  constructor(args: Partial<CouponHistoryEntity>) {
    super();
    Object.assign(this, args);
  }
}
