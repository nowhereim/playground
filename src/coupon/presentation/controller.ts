import { Body, Controller, Post } from '@nestjs/common';
import { CouponService } from '../application/service';
import { CreateCouponDto, IssueCouponDto } from '../application/dto/dto';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post('/issue')
  async issueCoupon(@Body() args: IssueCouponDto) {
    await this.couponService.issueCoupon(args);
    return 'Coupon issued';
  }

  @Post('/create')
  async createCoupon(@Body() args: CreateCouponDto) {
    await this.couponService.createCoupon(args);
    return 'Coupon created';
  }
}
