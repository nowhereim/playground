import { Exclude } from 'class-transformer';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn()
  @Exclude()
  private createdAt!: Date;

  @UpdateDateColumn()
  @Exclude()
  private updatedAt!: Date;

  @DeleteDateColumn()
  @Exclude()
  private deletedAt!: Date;
}
