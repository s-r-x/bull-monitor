import React from 'react';
import CloseableTip from '@/components/CloseableTip';

type TProps = {
  className?: string;
};
const DataSearchTip = ({ className }: TProps) => {
  return (
    <CloseableTip
      className={className}
      persistKey="data-text-search-v2"
      tip='Data search is powered by jsonata(https://docs.jsonata.org/overview.html). Example query for data {"user": {"profile": {"name": "ilya", "age": 30}}} -> user.profile[name="ilya" and age>=30]'
    />
  );
};
export default DataSearchTip;
