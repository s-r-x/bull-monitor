import { gqlClient } from '@/network/gql-client';
import type {
  ResumeQueueMutation,
  ResumeQueueMutationVariables,
} from '@/typings/gql';
import { gql } from 'graphql-request';

export const resumeQueue = (
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
