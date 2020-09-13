import React, { useState } from "react";
import { Card, Typography, Image } from "antd";
import Modal from "antd/lib/modal/Modal";
import "../styles/Instructions.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
const stepOneImg = require("../assets/images/instructionsStart.JPG");
const stepTwoImg = require("../assets/images/instructionsPickCard.JPG");

interface InstructionsProps {
  visible: boolean;
  hide: () => void;
}

const instructionSteps: { [key: number]: any[] } = {
  1: [
    <div>
      {" "}
      Press <b>Play</b> and fill in your course details. This should be the
      course that you would like to evaluate! 📜
    </div>,
    stepOneImg,
  ],
  2: [
    <div>
      You will be presented with the first pair of cards. If the statements on
      the cards are applicable to your course, pick one that resonates with you
      the most 💓 <br /> If the statements are not applicable, don't worry, you
      can always skip to the next pair! ⏭️ <br /> Psst🤫...in the future
      versions we will add the ability to edit statements, so you can tailor the
      HeaRT game to your course.
    </div>,
    stepTwoImg,
  ],
  3: [
    <div>
      When you pick a statement you are presented with a dimension bar. You need
      to select your stance on the dimension: how much does your course tend
      towards one card over the other. For example, is your course more
      teacher-managed, or is it more student-managed? 🤔 <br />
      In future versions, you will be able to explain your choice for each
      dimension in a text note.
    </div>,
    stepOneImg,
  ],
  4: [
    <div>
      Once you went through all teaching dimensions, you can preview and edit
      your answers before saving your chart 💾
    </div>,
    stepTwoImg,
  ],
  5: [
    <div>
      {" "}
      Save your chart, and compare your answers with your colleagues to see what
      your perspectives on the course are. Discuss the results, and play the
      game again as needed! <br />
      The HeaRT tool is all about sparking the conversation 🔥
    </div>,
    stepOneImg,
  ],
};
const Instructions: React.FC<React.PropsWithChildren<InstructionsProps>> = (
  props
) => {
  const [instructionsState, setInstructionsStep] = useState({ currentStep: 1 });
  const changeStep = (changeBy: number) => {
    setInstructionsStep({
      ...instructionsState,
      currentStep: instructionsState.currentStep + changeBy,
    });
  };

  return (
    <Modal
      title="Instructions"
      visible={props.visible}
      onOk={props.hide}
      onCancel={props.hide}
      width={1000}
      footer={null}
    >
      <div className="Instructions-Container">
        <Card bordered={false}>
          <div className="Navigation-Container">
            <button
              className="Navigation-Button"
              disabled={instructionsState.currentStep <= 1}
              onClick={(e) => changeStep(-1)}
            >
              <LeftOutlined />
            </button>
            <Image
              width={400}
              src={instructionSteps[instructionsState.currentStep][1]}
            />
            <button
              className="Navigation-Button"
              disabled={
                instructionsState.currentStep ===
                Object.keys(instructionSteps).length
              }
              onClick={(e) => changeStep(+1)}
            >
              <RightOutlined />
            </button>
          </div>
          <Typography>
            {instructionSteps[instructionsState.currentStep][0]}
          </Typography>
        </Card>
        <Typography>
          {instructionsState.currentStep}/{Object.keys(instructionSteps).length}
        </Typography>
      </div>
    </Modal>
  );
};

export default Instructions;
