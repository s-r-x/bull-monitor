import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import { StorageConfig } from '@/config/storage';

type TProps = {
  className?: string;
  tip: string;
  persistKey: string;
};
export default function CloseableTip(props: TProps) {
  const persistKey = StorageConfig.closeableTipNs + props.persistKey;
  const [isOpen, setIsOpen] = useState(!localStorage.getItem(persistKey));
  const onClose = () => {
    localStorage.setItem(persistKey, '!');
    setIsOpen(false);
  };
  if (!isOpen) {
    return null;
  }
  return (
    <Alert severity="info" className={props.className} onClose={onClose}>
      {props.tip}
    </Alert>
  );
}
