import { EventType } from 'src/domain/events/event.dispatcher';
import { EntityManager } from 'typeorm';
import { Outbox } from '../outbox';

export interface IConcertOutboxReader {
  findByTransactionId(
    args: { transactionId: string; eventType: EventType },
    transactionalEntityManager?: EntityManager,
  ): Promise<Outbox>;
}
