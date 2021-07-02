import { jobTypeDef } from './job';
import { mutationsTypeDef } from './mutations';
import { queueTypeDef } from './queue';
import { redisInfoTypeDef } from './redis-info';
import { rootQueryTypeDef } from './root-query';
import { metricsTypeDef } from './metrics';

export const typeDefs = [
  redisInfoTypeDef,
  jobTypeDef,
  queueTypeDef,
  metricsTypeDef,
  mutationsTypeDef,
  rootQueryTypeDef,
];
