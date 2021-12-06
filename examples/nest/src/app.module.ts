import { Module } from '@nestjs/common';
import { BullMonitorModule } from './bull-monitor.module';

@Module({
  imports: [BullMonitorModule],
})
export class AppModule {}
