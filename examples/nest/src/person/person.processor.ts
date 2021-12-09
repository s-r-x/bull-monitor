import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('person')
export class PersonProcessor {
  @Process('person_photo')
  processQueue(job: Job<any>) {
    console.log(job);
  }
}
