import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from 'react';
import debounce from 'lodash/debounce';
import { dataSearchAtom, clearDataSearchAtom } from '@/atoms/workspaces';
import { useUpdateAtom } from 'jotai/utils';
import { useAtom } from 'jotai';

const SEARCH_INPUT_DEBOUNCE = 250;
export const useDataSearchState = () => {
  const [search, setSearch] = useState('');
  const [atomSearch, changeAtomSearch] = useAtom(dataSearchAtom);
  const clear = useUpdateAtom(clearDataSearchAtom);
  const onClear = useCallback(() => {
    clear();
    setSearch('');
  }, []);
  useEffect(() => {
    if (!isDebouncingRef.current) {
      setSearch(atomSearch);
    }
  }, [atomSearch]);
  const isDebouncingRef = useRef(false);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = useMemo(() => {
    const debounced = debounce((v: string) => {
      isDebouncingRef.current = false;
      changeAtomSearch(v);
    }, SEARCH_INPUT_DEBOUNCE);
    return ({ target: { value } }) => {
      isDebouncingRef.current = true;
      setSearch(value);
      debounced(value);
    };
  }, []);
  return {
    onClear,
    search,
    onChange,
  };
};
