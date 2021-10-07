const DATE_FORMAT = 'YYYY-MM-DD HH:mm';
import day from 'dayjs';

export const tickXFormatter = (timestamp: number): string => {
  return day(timestamp).format(DATE_FORMAT);
};
export const tooltipLabelFormatter = (label: number): string => {
  return day(label).format(DATE_FORMAT);
};
