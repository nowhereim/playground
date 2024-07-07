import { Coupon } from '../domain/model';

export class IssueCouponEventModel implements IEventModel<Coupon> {
  readonly model: Coupon;
  readonly args: {
    userId: number;
    couponId: number;
  };
  readonly modelEntityName: string;

  constructor(props: { model: Coupon; args: any }) {
    this.model = props.model;
    this.args = props.args;
    this.modelEntityName = props.model.constructor.name;
  }
}

export interface IEventModel<T> {
  readonly model: T;
  readonly args: any;
  readonly modelEntityName: string;
}
