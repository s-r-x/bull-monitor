import type {
  ResumeQueueMutation,
  ResumeQueueMutationVariables,
} from '@/typings/gql';
import { gql, GraphQLClient } from 'graphql-request';

export const resumeQueue = (gqlClient: GraphQLClient) => (
  args: ResumeQueueMutationVariables
): Promise<ResumeQueueMutation> =>
  gqlClient.request(
    gql`
      mutation ResumeQueue($queue: ID!) {
        resumeQueue(queue: $queue) {
          name
        }
      }
    `,
    args
  );
