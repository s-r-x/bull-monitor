import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import shallow from 'zustand/shallow';
import { useSettingsModalStore } from '@/stores/settings-modal';
import Appearance from './Appearance';
import Preferences from './Preferences';
import CodeEditor from './CodeEditor';
import Box from '@material-ui/core/Box';
import Network from './Network';
import Typography from '@material-ui/core/Typography';

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
        <Button onClick={onClose}>Close</Button>
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
