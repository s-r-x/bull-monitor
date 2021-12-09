import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { BullMonitorModule } from './bull-monitor/bull-monitor.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [
    BullModule.forRoot({ redis: { host: 'localhost', port: 6379 } }),
    BullMonitorModule,
    PersonModule,
  ],
})
export class AppModule {}
