#!/usr/bin/env node
import Queue from 'bull';
import Express from 'express';
import { BullMonitorExpress } from '@bull-monitor/express';
import { createCommand, Option } from 'commander';

const program = createCommand();

program
  .addOption(
    new Option('--redis-uri <uri>', 'Redis URI').default(
      'redis://localhost:6379'
    )
  )
  .requiredOption('-q, --queue <queues...>', 'Queue names')
  .addOption(
    new Option(
      '--metrics-collect-interval-seconds <number>',
      'Metric collection interval in seconds'
    ).default(3600, '3600(1 hour)')
  )
  .option('-p, --port <number>', 'port number', '3000')
  .option('--max-metrics <number>', 'Max metrics', '100');

program.parse();

const options = program.opts();

(async () => {
  const Adapter = require('@bull-monitor/root/dist/bull-adapter').BullAdapter;
  const monitor = new BullMonitorExpress({
    queues: options.queue.map((name: string) => {
      return new Adapter(new Queue(name, options.redisUri));
    }),
    metrics: {
      collectInterval: { seconds: options.metricsCollectIntervalSeconds },
      maxMetrics: 100,
    },
  });

  await monitor.init();

  const app = Express();
  app.use(monitor.router);
  app.listen(options.port, () => {
    console.log(`Ready on http://127.0.0.1:${options.port}/`);
  });
})();
