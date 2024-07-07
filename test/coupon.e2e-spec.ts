import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CouponModule } from 'src/coupon/coupon.module';
import { DatabaseModule } from 'src/libs/datasource/module';

describe('CouponController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CouponModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // it('/coupon/create (POST)', () => {
  //   return request(app.getHttpServer())
  //     .post('/coupon/create')
  //     .send({
  //       name: 'test',
  //       discountRate: 1,
  //       expirationDate: '2021-12-31T23:59:59.999Z',
  //       maxIsuueCount: 30,
  //       issuedQuantity: 0,
  //     })
  //     .expect(201)
  //     .expect('Coupon created');
  // });

  it('/coupon/issue (POST)', () => {
    const requests = Array.from({ length: 100 }, (_, i) =>
      request(app.getHttpServer())
        .post('/coupon/issue')
        .send({
          couponId: 1,
          userId: i,
        })
        .expect(201)
        .expect('Coupon issued'),
    );
    return Promise.all(requests);
  });
});
