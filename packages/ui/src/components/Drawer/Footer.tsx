import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import type { GetQueuesQuery } from '@/typings/gql';
import { useQueuesCollapseStore } from '@/stores/queues-collapse';
import shallow from 'zustand/shallow';

const useStyles = makeStyles((theme) => ({
  group: {
    background: theme.palette.background.paper,
    display: 'flex',
    '& button': {
      width: '50%',
    },
  },
}));
type TProps = {
  className?: string;
  queues: NonNullable<GetQueuesQuery['queues']>;
};
const DrawerFooter = (props: TProps) => {
  const cls = useStyles();
  const [expand, collapse] = useQueuesCollapseStore(
    (state) => [state.expandMany, state.collapseMany],
    shallow,
  );
  return (
    <div className={props.className}>
      <ButtonGroup className={cls.group} variant="text">
        <Button onClick={() => expand(props.queues.map((queue) => queue.id))}>
          Expand
        </Button>
        <Button onClick={() => collapse(props.queues.map((queue) => queue.id))}>
          Collapse
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default DrawerFooter;
