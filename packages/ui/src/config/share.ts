import qs from 'query-string';

const queryParamName = 'share';
const shareToken = qs.parse(window.location.search)[queryParamName];
export const ShareConfig = {
  queryParamName,
  shareToken,
};
