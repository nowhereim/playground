import { Injectable } from '@nestjs/common';
import { EntityManager, ObjectType } from 'typeorm';
import { BaseEntity } from './base-entity';

@Injectable()
export abstract class Repository<T extends BaseEntity> {
  protected abstract entityClass: ObjectType<T>;

  constructor(private entityManager: EntityManager) {}

  getManager(): EntityManager {
    return this.entityManager;
  }
}
