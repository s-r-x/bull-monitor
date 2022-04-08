import React from 'react';
import CloseableTip from '@/components/CloseableTip';

type TProps = {
  className?: string;
};
const DataSearchTip = ({ className }: TProps) => {
  const text = (
    <>
      Search is powered by{' '}
      <a target="__blank" href="https://docs.jsonata.org/overview.html">
        jsonata
      </a>
      . Check out the{' '}
      <a
        target="__blank"
        href="https://github.com/s-r-x/bull-monitor/blob/main/search-examples.md"
      >
        examples
      </a>
      .
    </>
  );
  return (
    <CloseableTip
      className={className}
      persistKey="data-text-search-v3"
      tip={text}
    />
  );
};
export default DataSearchTip;
