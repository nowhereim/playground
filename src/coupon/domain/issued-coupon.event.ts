import { Injectable } from '@nestjs/common';
import { EventEmitter2 as EventEmitter } from '@nestjs/event-emitter';

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
  private static eventQueue: Event[] = [];

  static initialize(eventEmitter: EventEmitter) {
    Events.eventEmitter = eventEmitter;
  }

  static raise(event: Event) {
    this.eventEmitter.emit(event.constructor.name, event);
  }

  //   static release(): void {
  //     if (!this.eventEmitter) {
  //       throw new Error('EventEmitter not initialized');
  //     }
  //     const events = this.eventQueue;
  //     events.forEach((event) => {
  //       this.eventEmitter.emit(event.constructor.name, event);
  //     });
  //     this.eventQueue = [];
  //   }

  //   static clear() {
  //     this.eventQueue = [];
  //   }
}
