import type { Maybe } from '@/typings/utils';
import day from 'dayjs';
export const useFormatDateTime = (
  date?: Maybe<day.ConfigType>,
  format = 'YYYY-MM-DD HH:mm:ss'
): Maybe<string> => {
  if (!date) {
    return null;
  }
  return day(date).format(format);
};
