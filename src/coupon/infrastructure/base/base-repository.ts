import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, EntityTarget } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { BaseEntity } from './base-entity';
@Injectable()
export abstract class Repository<T extends BaseEntity> {
  protected abstract entityClass: EntityTarget<T>;
  @InjectDataSource() protected dataSource!: DataSource;

  constructor(private entityManager: EntityManager) {}

  getManager(): EntityManager {
    return this.entityManager;
  }

  getTransactionManager(): EntityManager {
    return this.dataSource.createEntityManager();
  }
}
