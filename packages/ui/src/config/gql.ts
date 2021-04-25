import { EnvConfig } from './env';

const devBaseUrl = 'http://localhost:3000';
const { pathname } = window.location;
const prodBaseUrl = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
const baseUrl = EnvConfig.dev ? devBaseUrl : prodBaseUrl;
export const GqlConfig = {
  endpoint: baseUrl + '/graphql',
};
