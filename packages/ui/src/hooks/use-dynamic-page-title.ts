import { useActiveQueueStore } from '@/stores/active-queue';
import { useEffect } from 'react';

export const useDynamicPageTitle = () => {
  const queue = useActiveQueueStore((state) => state.active);
  useEffect(() => {
    const $title = document.querySelector('title');
    if (queue && $title) {
      $title.textContent = queue;
    }
  }, [queue]);
};
