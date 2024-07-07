import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
@Injectable()
export class Repository {
  @InjectDataSource() protected dataSource!: DataSource;

  constructor(private entityManager: EntityManager) {}

  getManager(): EntityManager {
    return this.entityManager;
  }

  getTransactionManager(): EntityManager {
    return this.dataSource.createEntityManager();
  }
}
