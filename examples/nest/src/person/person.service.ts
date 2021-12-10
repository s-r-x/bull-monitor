import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class PersonService {
  constructor(@InjectQueue('person') private readonly personQueue: Queue) {}

  async addToQueue() {
    await this.personQueue.add('person_photo', {});

    return { ok: true, messsage: 'Job added to queue' };
  }
}
