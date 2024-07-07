import { Injectable } from '@nestjs/common';
import { DomainEvent } from './event.entity';
import { EntityManager } from 'typeorm';
import { EventEmitter2 as EventEmitter } from '@nestjs/event-emitter';
import { IEventModel } from 'src/coupon/application/event.test';

@Injectable()
export class EventRepositoryImpl {
  constructor(
    private entityManager: EntityManager,
    private eventEmitter: EventEmitter,
  ) {}
  async saveEvent<T>(args: {
    events: IEventModel<T>[];
    transactionalEntityManager?: EntityManager;
  }) {
    const convertTest = args.events.map((event) => {
      const ee = new DomainEvent();
      ee.data = JSON.stringify(event);
      ee.type = event.constructor.name;
      return ee;
    });
    await (args.transactionalEntityManager ?? this.entityManager).save(
      DomainEvent,
      convertTest,
    );
    await Promise.all(
      args.events.map((event) =>
        this.eventEmitter.emit(event.modelEntityName, event),
      ),
    );
  }
}

// 이벤트 발행은 도메인 객체가 해야함.

// 이벤트 클래스 ( 예를 들어 쿠폰 발행 이벤트 (과거형) 을 만들고 events라는 디스패쳐를 만들어서 이벤트 클래스를 넣어주면 디스패쳐는 이걸 그냥 발행 갈겨버림.)
