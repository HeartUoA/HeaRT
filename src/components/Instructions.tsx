import React, { useState } from "react";
import { Card, Slider, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";

interface InstructionsProps {
  visible: boolean;
  hide: () => void;
}

const Instructions: React.FC<React.PropsWithChildren<InstructionsProps>> = (
  props
) => {
  const setVisibility = () => {
    props.visible = !props.visible;
  };
  return (
    <Modal
      title="Basic Modal"
      visible={props.visible}
      onOk={props.hide}
      onCancel={props.hide}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default Instructions;
