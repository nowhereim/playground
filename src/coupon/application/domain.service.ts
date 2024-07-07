import { Inject } from '@nestjs/common';
import { IEventRepository } from '../domain/repository';

export class DomainService {
  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
  ) {}
}
