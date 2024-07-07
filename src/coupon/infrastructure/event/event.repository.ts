import { Injectable } from '@nestjs/common';
import { DomainEvent } from './event.entity';
import { EntityManager } from 'typeorm';
import { Event } from 'src/coupon/domain/issued-coupon.event';

@Injectable()
export class EventRepositoryImpl {
  constructor(private entityManager: EntityManager) {}
  async saveEvent(args: {
    events: Event[];
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
  }
}
