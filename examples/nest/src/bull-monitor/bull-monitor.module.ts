import { BullModule } from '@nestjs/bull';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BullMonitorService } from './bull-monitor.service';

@Module({
  imports: [BullModule.registerQueue({ name: 'person' })],
  providers: [BullMonitorService],
})
export class BullMonitorModule implements NestModule {
  constructor(private monitor: BullMonitorService) {}
  async configure(consumer: MiddlewareConsumer) {
    await this.monitor.init();
    consumer.apply(this.monitor.router).forRoutes('/bull-monitor');
  }
}
