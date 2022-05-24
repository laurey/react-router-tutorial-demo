import { useState, useCallback, useEffect } from "react";

function useUnsavedChangesWarning(
  message = "Are you sure to discard changes???"
) {
  const [target, setTarget] = useState("/");
  const [isBlocking, setIsBlocking] = useState(false);
  const [forceRedirect, setForceRedirect] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handlePromptModalVisibility = useCallback((location) => {
    setTarget(location);
    setConfirmVisible(true);
  }, []);

  const handleAllowPromptTransition = useCallback(() => {
    setIsBlocking(false);
    setConfirmVisible(false);
    setForceRedirect(true);
  }, []);

  const handleHidePromptModal = useCallback(() => {
    setConfirmVisible(false);
  }, []);

  const handleUnload = useCallback(
    (e) => {
      e.preventDefault();
      e.returnValue = message;
      return message;
    },
    [message]
  );

  useEffect(() => {
    // if (!isBlocking) {
    //   setConfirmVisible(false);
    // }

    // if (forceRedirect && target) {
    //   history.push(
    //     {
    //       pathname: target.pathname,
    //     },
    //     target.state
    //   );
    // }
    window.onbeforeunload = isBlocking && handleUnload;
    return () => {
      window.onbeforeunload = null;
    };
  }, [handleUnload, isBlocking]);

  return {
    target,
    isBlocking,
    forceRedirect,
    confirmVisible,
    handleHidePromptModal,
    handleAllowPromptTransition,
    handlePromptModalVisibility,
    setIsBlocking,
  };
}

export default useUnsavedChangesWarning;
