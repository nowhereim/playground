import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { nanoid } from 'nanoid';
import { promisify } from 'util';
import { KafkaReservationProducerImpl } from 'src/infrastructure/kafka/kafka-reservation.producer-impl';
import { QueueFacadeApp } from 'src/application/queue/queue.facade';
import { EventType } from 'src/domain/events/event-type.enum';

describe('Queue message (e2e)', () => {
  let app: INestApplication;
  let uuid: string;
  let kafkaProducer: KafkaReservationProducerImpl;
  let queueFacadeApp: QueueFacadeApp;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    kafkaProducer = moduleFixture.get<KafkaReservationProducerImpl>(
      KafkaReservationProducerImpl,
    );
    queueFacadeApp = moduleFixture.get<QueueFacadeApp>(QueueFacadeApp);
    uuid = nanoid();

    await app.init();
    await promisify(setTimeout)(5000);
  }, 60000);

  it('임의의 큐 활성화 메시지를 발행하여 대기열에 적재되어있던 데이터가 활성화됨을 확인', async () => {
    await queueFacadeApp.registerQueue({ userId: 1 });
    await kafkaProducer.publishEvent({
      event: { userId: 1, transactionId: uuid },
      type: EventType.ACTIVE_QUEUE_TOKEN,
    });
    await promisify(setTimeout)(1000);
    const result = await queueFacadeApp.validToken({ queueId: 1 });
    expect(result.status).toBe('IN_PROGRESS');
  }, 60000);

  it('임의의 결제성공 이벤트를 발행하여 활성토큰이 만료됨을 확인', async () => {
    await queueFacadeApp.registerQueue({ userId: 1 });
    await kafkaProducer.publishEvent({
      event: { userId: 1, transactionId: uuid },
      type: EventType.ACTIVE_QUEUE_TOKEN,
    });
    await promisify(setTimeout)(1000);
    await kafkaProducer.publishEvent({
      event: { args: { userId: 1 } },
      type: EventType.PAYMENT_COMPLETED,
    });
    await promisify(setTimeout)(1000);
    await expect(queueFacadeApp.validToken({ queueId: 1 })).rejects.toThrow(
      NotFoundException,
    );
  });

  /**
   * @summary Redis의 TTL을 이용중이기 때문에 불필요한 테스트이므로 생략
   */
  it('일정시간이 지난 활성화된 큐를 확인하여 만료시키는 이벤트를 발행후 만료됨을 확인', async () => {});
});
