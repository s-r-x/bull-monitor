import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonProcessor } from './person.processor';
import { PersonService } from './person.service';

@Module({
  imports: [BullModule.registerQueue({ name: 'person' })],
  providers: [PersonService, PersonProcessor],
  controllers: [PersonController],
})
export class PersonModule {}
