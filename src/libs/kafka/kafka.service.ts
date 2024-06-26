import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Admin, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private admin: Admin;
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      clientId: 'nestjs',
      brokers: [process.env.KAFKA_BROKER],
      logLevel: 2,
      retry: {
        retries: 5,
        initialRetryTime: 300,
        factor: 2,
        multiplier: 1.5,
        maxRetryTime: 30000,
      },
    });
    this.admin = kafka.admin();
    this.producer = kafka.producer();
  }

  async onModuleInit() {
    await this.createTopics(['lecture-enroll', 'sexy-topic']);
    await this.producer.connect();
  }

  async createTopics(topics: string[]) {
    await this.admin.connect();
    const existingTopics = await this.admin.listTopics();
    const topicsToCreate = topics.filter(
      (topic) => !existingTopics.includes(topic),
    );

    if (topicsToCreate.length > 0) {
      await this.admin.createTopics({
        topics: topicsToCreate.map((topic) => ({
          topic,
          numPartitions: 1,
          replicationFactor: 1,
        })),
      });
    }
    await this.admin.disconnect();
  }

  async sendMessage(topic: string, key: string, message: any) {
    console.log('Sending message:', message);
    await this.producer.send({
      topic,
      messages: [
        {
          key,
          value: JSON.stringify(message),
        },
      ],
    });
  }

  async handleMessage(message: any) {
    console.log('Received message:', message);
    // 메시지 처리 로직
  }
}
