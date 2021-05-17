import React, { memo } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { eventEmitter } from '@/services/event-emitter';
import { makeStyles } from '@material-ui/core/styles';

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
};
const DrawerFooter = (props: TProps) => {
  const cls = useStyles();
  return (
    <div className={props.className}>
      <ButtonGroup className={cls.group} variant="text">
        <Button onClick={() => eventEmitter.emit('drawer/expandCounts')}>
          Expand
        </Button>
        <Button onClick={() => eventEmitter.emit('drawer/collapseCounts')}>
          Collapse
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default memo(DrawerFooter);
