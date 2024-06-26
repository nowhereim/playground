import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { KafkaService } from './libs/kafka/kafka.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly kafkaService: KafkaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Kafka 테스트용 메시지 전송 엔드포인트
  @Post('/send-test-message')
  async sendTestMessage(@Body('message') message: string) {
    await this.kafkaService.sendMessage('lecture-enroll', '1', message);
    await this.kafkaService.sendMessage('sexy-topic', '1', 'sexyboy');
    return 'Message sent';
  }
}
