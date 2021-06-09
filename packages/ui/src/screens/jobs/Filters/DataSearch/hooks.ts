import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from 'react';
import debounce from 'lodash/debounce';
import {
  dataSearchTermAtom,
  dataSearchKeyAtom,
  clearDataSearchAtom,
} from '@/atoms/workspaces';
import { useUpdateAtom } from 'jotai/utils';
import { useAtom } from 'jotai';

const SEARCH_INPUT_DEBOUNCE = 250;
export const useDataSearchState = () => {
  const [key, setKey] = useState('');
  const [term, setTerm] = useState('');
  const [atomKey, changeAtomKey] = useAtom(dataSearchKeyAtom);
  const [atomTerm, changeAtomTerm] = useAtom(dataSearchTermAtom);
  const clear = useUpdateAtom(clearDataSearchAtom);
  const onClear = useCallback(() => {
    clear();
    setKey('');
    setTerm('');
  }, []);
  useEffect(() => {
    if (!isKeyDebouncingRef.current) {
      setKey(atomKey);
    }
  }, [atomKey]);
  useEffect(() => {
    if (!isTermDebouncingRef.current) {
      setTerm(atomTerm);
    }
  }, [atomTerm]);
  const isKeyDebouncingRef = useRef(false);
  const isTermDebouncingRef = useRef(false);
  const onKeyChange: React.ChangeEventHandler<HTMLInputElement> = useMemo(() => {
    const debounced = debounce((v: string) => {
      isKeyDebouncingRef.current = false;
      changeAtomKey(v);
    }, SEARCH_INPUT_DEBOUNCE);
    return ({ target: { value } }) => {
      isKeyDebouncingRef.current = true;
      setKey(value);
      debounced(value);
    };
  }, []);
  const onTermChange: React.ChangeEventHandler<HTMLInputElement> = useMemo(() => {
    const debounced = debounce((v: string) => {
      changeAtomTerm(v);
      isTermDebouncingRef.current = false;
    }, SEARCH_INPUT_DEBOUNCE);
    return ({ target: { value } }) => {
      isTermDebouncingRef.current = true;
      setTerm(value);
      debounced(value);
    };
  }, []);
  return {
    key,
    term,
    onKeyChange,
    onTermChange,
    onClear,
  };
};
