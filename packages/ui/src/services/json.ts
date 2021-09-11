export const JsonService = {
  maybeStringify(data?: any, space = 2) {
    if (data && typeof data === 'object') {
      try {
        return JSON.stringify(data, null, space);
      } catch (_e) {
        return data;
      }
    }
    return data;
  },
  maybeParse(data?: any) {
    if (data && typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch (_e) {
        return data;
      }
    }
    return data;
  },
};
