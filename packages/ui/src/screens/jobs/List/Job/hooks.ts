import { useEffect, useRef } from 'react';

export const useRemoveJobSelectionOnUnmount = (
  jobId: string,
  isSelected: boolean,
  removeSelected: (id: string) => void
) => {
  const jobIdRef = useRef(jobId);
  const isSelectedRef = useRef(isSelected);
  jobIdRef.current = jobId;
  isSelectedRef.current = isSelected;
  useEffect(() => {
    return () => {
      if (isSelectedRef.current && jobIdRef.current) {
        removeSelected(jobIdRef.current);
      }
    };
  }, []);
};
