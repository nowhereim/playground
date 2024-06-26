import {
  Controller,
  Inject,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { ClientKafka, Payload, MessagePattern } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';

@Controller()
export class KafkaController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly kafkaService: KafkaService,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('lecture-enroll');
    await this.kafkaClient.connect();
  }

  async onModuleDestroy() {
    await this.kafkaClient.close();
  }

  @MessagePattern('lecture-enroll')
  async handleLectureEnroll(@Payload() message: any) {
    console.log('Handling lecture enroll message:', message);
    await this.kafkaService.handleMessage(message);
  }

  @MessagePattern('sexy-topic')
  async handleSexyTopic(@Payload() message: any) {
    console.log('Handling sexy topic message:', message);
  }
}
