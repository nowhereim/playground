import {
  AfterLoad,
  // BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DomainEventEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;

  @Column()
  occurredAt: Date;

  @Column({ type: 'text' })
  data!: string;

  constructor() {
    this.occurredAt = new Date();
  }

  @AfterLoad()
  private deserialize() {
    const props = JSON.parse(this.data);
    Object.assign(this, props);
  }
}
