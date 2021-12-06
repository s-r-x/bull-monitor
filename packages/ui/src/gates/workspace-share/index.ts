import { useEffect, useState } from 'react';
import { ShareConfig } from '@/config/share';
import { Base64 } from '@/services/base64';
import { useUpdateAtom } from 'jotai/utils';
import { addWorkspaceAtom } from '@/atoms/workspaces';
import isObject from 'lodash/isObject';

const token = ShareConfig.shareToken;
const WorkspaceShareGate: React.FC = (props) => {
  const [hydrated, setHydrated] = useState(!token);
  const addWorkspace = useUpdateAtom(addWorkspaceAtom);
  useEffect(() => {
    if (!hydrated) {
      if (typeof token === 'string') {
        const data = Base64.decodeJSON(token);
        if (isObject(data)) {
          addWorkspace(data);
          window.history.replaceState(
            null,
            document.title,
            window.location.pathname
          );
        }
      }
      setHydrated(true);
    }
  }, [hydrated]);
  if (!hydrated) {
    return null;
  }
  return props.children as React.ReactElement;
};

export default WorkspaceShareGate;
