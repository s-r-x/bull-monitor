import { JobResolver } from './job';
import { queueResolver } from './queue';
import { mutationResolver } from './mutation';
import { queryResolver } from './query';
import { scalarsResolver } from './scalars';

export const resolvers = [
  scalarsResolver,
  JobResolver,
  queueResolver,
  mutationResolver,
  queryResolver,
];
