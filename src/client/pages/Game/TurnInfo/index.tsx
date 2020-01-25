import React from "react";
import ToggleText from "../../../components/ToggleText";

export default ({
  turnInfo
}: {
  turnInfo: { isOpen: boolean; message: string };
}) => {
  const { isOpen, message } = turnInfo;

  return <ToggleText isOpen={isOpen} text={message} />;
};
