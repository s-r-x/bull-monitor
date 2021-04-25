import CodeEditor from '@/components/CodeEditor';
import React from 'react';

type TProps = {
  options?: string;
};
export default function Options(props: TProps) {
  return <CodeEditor value={props.options} readOnly />;
}
