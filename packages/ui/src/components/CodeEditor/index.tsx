import React from 'react';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/json-lint';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/keymap/sublime';
import 'codemirror/keymap/emacs';
import 'codemirror/keymap/vim';
import type { Maybe } from '@/typings/utils';
import { Controlled as CodeMirror } from 'react-codemirror2';
// @ts-ignore
import jsonlint from 'jsonlint-mod';
import { useCodeEditorStore } from '@/stores/code-editor';
import shallow from 'zustand/shallow';
import makeStyles from '@mui/styles/makeStyles';
// @ts-ignore
window.jsonlint = jsonlint;
import Button from '@mui/material/Button';
import { JsonService } from '@/services/json';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'relative',
  },
  utils: {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 2,
  },
});
type TProps = {
  value?: Maybe<string>;
  onChange?: (value: string) => void;
  readOnly?: boolean;
};

const CodeEditor = (props: TProps) => {
  const cls = useStyles();
  const [theme, keyMap, tabSize] = useCodeEditorStore(
    (state) => [state.theme, state.keyMap, state.tabSize],
    shallow
  );
  const formatValue = () => {
    if (props.onChange && props.value) {
      props.onChange(
        JsonService.maybeStringify(JsonService.maybeParse(props.value))
      );
    }
  };
  return (
    <div className={cls.root}>
      <CodeMirror
        onBeforeChange={(_editor, _data, value) => {
          if (props.onChange) {
            props.onChange(value);
          }
        }}
        options={{
          // @ts-ignore
          autoCloseBrackets: true,
          matchBrackets: true,
          lineWrapping: true,
          readOnly: props.readOnly,
          theme,
          tabSize,
          indentUnit: tabSize,
          lint: true,
          lineNumbers: true,
          mode: 'application/json',
          keyMap,
        }}
        value={props.value as string}
      />
      {!props.readOnly && props.value && (
        <div className={cls.utils} onClick={formatValue}>
          <Button color="info" size="small">
            Format
          </Button>
        </div>
      )}
    </div>
  );
};
export default CodeEditor;
