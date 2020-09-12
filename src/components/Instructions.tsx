import React, { useState } from "react";
import { Card, Slider, Typography, Image } from "antd";
import Modal from "antd/lib/modal/Modal";
import "../styles/Instructions.css";
const stepOneImg = require("../assets/images/instructionsStart.JPG");

interface InstructionsProps {
  visible: boolean;
  hide: () => void;
}

const instructionSteps = {
  1: (
    <div>
      {" "}
      Press Play and fill in your course details. This should be the course that
      you would like to evaluate! 📜
    </div>
  ),
  2: (
    <div>
      You will be presented with the first pair of cards. If the statements on
      the cards are applicable to your course, pick one that resonates with you
      the most 💓 <br /> If the statements are not applicable, don't worry, you
      can always skip to the next pair! ⏭️ <br /> Psst🤫...in the future
      versions we will add the ability to edit statements, so you can tailor the
      HeaRT game to your course.
    </div>
  ),
  3: "test",
  4: "test",
  5: "test",
};
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
      <div className="Instructions-Container">
        <Card>
          {" "}
          <div className="Image-Container">
            <Image width={200} src={stepOneImg} />
          </div>
          <Typography>{instructionSteps[1]}</Typography>
        </Card>
      </div>
    </Modal>
  );
};

export default Instructions;
