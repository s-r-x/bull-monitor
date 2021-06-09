import { activeQueueAtom } from '@/atoms/workspaces';
import { useAtomValue } from 'jotai/utils';
import { useEffect } from 'react';

export const useDynamicPageTitle = () => {
  const queue = useAtomValue(activeQueueAtom);
  useEffect(() => {
    const $title = document.querySelector('title');
    if (queue && $title) {
      $title.textContent = queue;
    }
  }, [queue]);
};
