import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import shallow from 'zustand/shallow';
import { useSettingsModalStore } from '@/stores/settings-modal';
import Appearance from './Appearance';
import Preferences from './Preferences';
import CodeEditor from './CodeEditor';
import Box from '@mui/material/Box';
import Network from './Network';
import Typography from '@mui/material/Typography';

const Section: React.FC = ({ children }) => (
  <Box marginBottom={2.5}>{children}</Box>
);
const Header: React.FC = ({ children }) => (
  <Typography
    style={{
      marginBottom: '-5px',
    }}
    variant="h6"
  >
    {children}
  </Typography>
);

const Settings = () => {
  const onClose = useSettingsModalStore((state) => state.close);
  return (
    <>
      <DialogContent>
        <Section>
          <Header>Appearance</Header>
          <Appearance />
        </Section>
        <Section>
          <Header>Network</Header>
          <Network />
        </Section>
        <Section>
          <Header>Text editor</Header>
          <CodeEditor />
        </Section>
        <Section>
          <Header>Preferences</Header>
          <Preferences />
        </Section>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </>
  );
};
export default function SettingsModal() {
  const [isOpen, onClose] = useSettingsModalStore(
    (state) => [state.isOpen, state.close],
    shallow
  );
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Settings />
    </Dialog>
  );
}
