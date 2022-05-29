import React, { useState, useCallback, useEffect } from "react";
import { Prompt, useHistory, useLocation } from "react-router-dom";
import { Modal } from "antd";
import _ from "lodash";

function PromptModal({
  isBlocked: isBlockedInProps,
  title,
  content,
  message = "Are you sure to discard your changes?",
  ...restProps
}) {
  const history = useHistory();
  const location = useLocation();
  const [confirmNavigation, setConfirmNavigation] = useState(false);
  const [isBlocked, setIsBlocked] = useState(isBlockedInProps);
  const [lastLocation, setLastLocation] = useState(location);
  const [shouldUnload, setShouldUnload] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleBlockNavigation = useCallback(
    (location) => {
      if (isBlocked && !confirmNavigation) {
        setLastLocation(location);
        setVisible(true);
      }
      return false;
    },
    [confirmNavigation, isBlocked]
  );

  const handleAllowTransition = useCallback(() => {
    setVisible(false);
    setIsBlocked(false);
    setShouldUnload(false);
    setConfirmNavigation(true);
  }, []);

  const handleHidePromptModal = useCallback(() => {
    setVisible(false);
    setShouldUnload(false);
  }, []);

  const handleUnload = useCallback(
    (event) => {
      const e = event || window.event;
      e.preventDefault();
      if (isBlocked && !shouldUnload) {
        e.returnValue = message;
      }

      if (shouldUnload) {
        e.returnValue = "";
      }
    },
    [isBlocked, message, shouldUnload]
  );

  useEffect(() => {
    if (confirmNavigation && lastLocation) {
      setShouldUnload(true);
      history.push(_.omit(lastLocation, "key"));
    }
  }, [confirmNavigation, history, lastLocation]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [handleUnload]);

  useEffect(() => {
    setIsBlocked(isBlockedInProps);
  }, [isBlockedInProps]);

  return (
    <>
      {isBlocked && <Prompt when={isBlocked} message={handleBlockNavigation} />}
      {visible && (
        <Modal
          centered
          destroyOnClose
          {...restProps}
          visible={visible}
          title={title}
          onCancel={handleHidePromptModal}
          onOk={handleAllowTransition}
        >
          {content ? (
            content
          ) : (
            <p>Your work is not saved! Are you sure you want to leave?</p>
          )}
        </Modal>
      )}
    </>
  );
}

export default PromptModal;
