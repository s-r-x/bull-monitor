import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BullMonitorExpress } from '@bull-monitor/express';

@Module({})
export class BullMonitorModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    const monitor = new BullMonitorExpress({ queues: [] });
    await monitor.init();
    consumer.apply(monitor.router).forRoutes('/bull-monitor');
  }
}
