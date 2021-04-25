import { jobTypeDef } from './job';
import { mutationsTypeDef } from './mutations';
import { queueTypeDef } from './queue';
import { redisInfoTypeDef } from './redis-info';
import { rootQueryTypeDef } from './root-query';

export const typeDefs = [
  redisInfoTypeDef,
  jobTypeDef,
  queueTypeDef,
  mutationsTypeDef,
  rootQueryTypeDef,
];
