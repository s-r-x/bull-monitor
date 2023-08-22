import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SimpleJsonView from '../SimpleJsonView';

type TProps = {
  header: string;
  textClassName?: string;
  defaultExpanded?: boolean;
};
const AccordionJsonView: React.FC<TProps> = (props) => {
  const { children, header, textClassName, defaultExpanded = true } = props;
  return (
    <div>
      <Accordion defaultExpanded={defaultExpanded}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{header}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SimpleJsonView className={textClassName}>{children}</SimpleJsonView>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionJsonView;

