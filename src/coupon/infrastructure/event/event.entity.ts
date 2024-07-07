import {
  AfterLoad,
  // BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DomainEvent {
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

  // @BeforeInsert()
  // private setType() {
  //   this.type = this.constructor.name;
  // }

  // @BeforeInsert()
  // private serialize() {
  //   const { id: _, type: __, occurredAt: ___, data: ____, ...props } = this;
  //   this.data = JSON.stringify(props);
  // }

  @AfterLoad()
  private deserialize() {
    const props = JSON.parse(this.data);
    Object.assign(this, props);
  }
}
