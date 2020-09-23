import React, { useState } from "react";
import { Card, Typography, Image } from "antd";
import Modal from "antd/lib/modal/Modal";
import "../styles/Instructions.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
const stepOneImg = require("../assets/images/instructionsStart.JPG");
const stepTwoImg = require("../assets/images/instructionsPickCard.JPG");
const { Title } = Typography;

interface InstructionsProps {
  visible: boolean;
  hide: () => void;
}

type Step = {
  title: string;
  description: JSX.Element;
  image: string;
};

const instructionSteps: { [key: number]: Step } = {
  1: {
    title: "Start the game",
    description: (
      <div>
        {" "}
        Press <b>Play</b> and fill in your course details.
        <br /> This should be the course that you would like to evaluate! 📜
      </div>
    ),
    image: stepOneImg,
  },
  2: {
    title: "Pick the card",
    description: (
      <div>
        You will be presented with the first pair of cards. <br /> If the
        statements on the cards are applicable to your course, pick one that
        resonates with you the most 💓 <br /> If the statements are not
        applicable, don't worry, you can always skip to the next pair! ⏭️ You
        must complete at least 8 pairs to finish the game. <br /> Psst🤫...in
        the future versions we will add the ability to edit statements, so you
        can tailor the HeaRT game to your course.
      </div>
    ),
    image: stepTwoImg,
  },
  3: {
    title: "Select your course dimension",
    description: (
      <div>
        When you pick a statement you are presented with a dimension bar. You
        need to select your stance on the dimension: how much does your course
        tend towards one card over the other. <br /> For example, is your course
        more teacher-managed, or is it more student-managed? 🤔 <br />
        In future versions, you will be able to explain your choice for each
        dimension in a text note.
      </div>
    ),
    image: stepOneImg,
  },
  4: {
    title: "Preview and edit your chart",
    description: (
      <div>
        Once you went through all teaching dimensions, you can preview and edit
        your answers before saving your chart 💾
      </div>
    ),
    image: stepTwoImg,
  },
  5: {
    title: "Save your chart",
    description: (
      <div>
        {" "}
        Save your chart, and compare your answers with your colleagues to see
        what your perspectives on the course are. Discuss the results, and play
        the game again as needed! <br />
        The HeaRT tool is all about sparking the conversation 🔥
      </div>
    ),
    image: stepOneImg,
  },
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
      width={window.innerWidth * 0.6}
      bodyStyle={{ height: window.innerHeight * 0.6, position: "relative" }}
      footer={null}
    >
      <div className="Instructions-Container">
        <Card bordered={false}>
          <Title level={2}>
            {instructionSteps[instructionsState.currentStep].title}
          </Title>
          <div className="Navigation-Container">
            <button
              className="Navigation-Button"
              disabled={instructionsState.currentStep <= 1}
              onClick={(e) => changeStep(-1)}
            >
              <LeftOutlined />
            </button>
            <span className="Instructions-Image">
              <Image
                width={400}
                src={instructionSteps[instructionsState.currentStep].image}
              />
            </span>
            <button
              className="Navigation-Button"
              disabled={
                instructionsState.currentStep ===
                Object.keys(instructionSteps).length
              }
              onClick={(e) => changeStep(1)}
            >
              <RightOutlined />
            </button>
          </div>
          <span className="Instructions-Text">
            <Typography>
              {instructionSteps[instructionsState.currentStep].description}
            </Typography>
          </span>
        </Card>
        <span className="Instructions-Counter">
          <Typography>
            {instructionsState.currentStep}/
            {Object.keys(instructionSteps).length}
          </Typography>
        </span>
      </div>
    </Modal>
  );
};

export default Instructions;
