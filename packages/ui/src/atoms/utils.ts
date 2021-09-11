import { atom } from 'jotai';
import type { PrimitiveAtom, SetStateAction } from 'jotai';
import { JsonService } from '@/services/json';

export function storageAtom<Value>(
  key: string,
  initialValue: Value
): PrimitiveAtom<Value> {
  const getInitialValue = (): Value => {
    try {
      return JsonService.maybeParse(localStorage.getItem(key)) || initialValue;
    } catch {
      return initialValue;
    }
  };
  const baseAtom = atom(getInitialValue());
  const anAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: SetStateAction<Value>) => {
      const newValue =
        typeof update === 'function'
          ? (update as (prev: Value) => Value)(get(baseAtom))
          : update;
      set(baseAtom, newValue);
      localStorage.setItem(key, JsonService.maybeStringify(newValue));
    }
  );

  return anAtom;
}
