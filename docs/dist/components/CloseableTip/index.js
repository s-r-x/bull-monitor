import React, {useState} from "../../../_snowpack/pkg/react.js";
import Alert from "../../../_snowpack/pkg/@material-ui/lab/Alert.js";
import {StorageConfig} from "../../config/storage.js";
export default function CloseableTip(props) {
  const persistKey = StorageConfig.closeableTipNs + props.persistKey;
  const [isOpen, setIsOpen] = useState(!localStorage.getItem(persistKey));
  const onClose = () => {
    localStorage.setItem(persistKey, "!");
    setIsOpen(false);
  };
  if (!isOpen) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(Alert, {
    severity: "info",
    className: props.className,
    onClose
  }, props.tip);
}
