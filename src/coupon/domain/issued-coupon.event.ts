import { Injectable } from '@nestjs/common';
import { EventEmitter2 as EventEmitter } from '@nestjs/event-emitter';
import { IEventRepository } from './repository';

export abstract class Event {
  readonly occurredAt: Date;

  constructor() {
    this.occurredAt = new Date();
  }
}

export class IssuedCouponEvent extends Event {
  constructor(
    readonly userId: number,
    readonly couponId: number,
  ) {
    super();
  }
}

@Injectable()
export class Events {
  private static eventEmitter: EventEmitter;
  private static eventRepository: IEventRepository;

  static initialize(
    eventEmitter: EventEmitter,
    eventRepository: IEventRepository,
  ) {
    Events.eventEmitter = eventEmitter;
    Events.eventRepository = eventRepository;
  }

  static raise(event: Event) {
    this.eventEmitter.emit(event.constructor.name, event);
    this.eventRepository.saveEvent({
      events: [event],
    });
  }
}
