import { JsonService } from './json';

const encode = (s: string) => window.btoa(s);
const decode = (s: string) => window.atob(s);

export const Base64 = {
  encode,
  decode,
  encodeJSON(json: any) {
    return encode(JsonService.maybeStringify(json));
  },
  decodeJSON<T = any>(s: string): T {
    return JsonService.maybeParse(decode(s));
  },
};
