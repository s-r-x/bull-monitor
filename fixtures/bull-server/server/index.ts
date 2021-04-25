import { BullMonitorExpress } from '@bull-monitor/express';
import express from 'express';
import Queue from 'bull';
import range from 'lodash/range';

const QUEUES_AMOUNT = 5;
const redisUri = process.env.REDIS_URI as string;
const port = process.env.PORT;
const app = express();

const queues = range(QUEUES_AMOUNT).map(n => new Queue(`queue:${n}`, redisUri));
queues[0].process('success', async job => {
  await job.moveToCompleted('some return value here');
});
queues[0].process('fail', job => {
  throw new Error('!'.repeat(1000));
});
//await Promise.all(queues.map(queue => queue.isReady()));

const monitor = new BullMonitorExpress({
  queues,
  gqlPlayground: true,
});

monitor.init().then(() => {
  app.use('/', monitor.router);
});

app.listen(port, () => {
  console.log(`Bull server fixture listening at http://localhost:${port}`);
});
