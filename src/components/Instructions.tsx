import React, { useState } from "react";
import { Card, Typography, Image, Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import "../styles/Instructions.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
const stepOneImg = require("../assets/images/instructionsStart.png");
const stepTwoImg = require("../assets/images/fillCourse.png");
const stepThreeImg = require("../assets/images/openCourse.png");
const stepFourImg = require("../assets/images/reasonToPlay.png");
const stepFiveImg = require("../assets/images/pickEditCard.gif");
const stepSixImg = require("../assets/images/selectAlignment.gif");
const stepSevenImg = require("../assets/images/preview.png");
const stepEightImg = require("../assets/images/compareCharts.gif");
const stepNineImg = require("../assets/images/printCards.gif");

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
    title: "Create New Course",
    description: (
      <div>
        {" "}
        Press <b>Create New Course</b> if you have not added any courses yet.
        <br />
      </div>
    ),
    image: stepOneImg,
  },
  2: {
    title: "Fill in the details",
    description: (
      <div>
        Complete your course details, so we know which course you are playing
        the game for!
        <br /> This should be the course that you would like to evaluate! 📜
      </div>
    ),
    image: stepTwoImg,
  },
  3: {
    title: "Open course",
    description: (
      <div>
        Open the course you created (or any other course that you would like to
        evaluate).
      </div>
    ),
    image: stepThreeImg,
  },
  4: {
    title: "Create chart and enter the reason of playing",
    description: (
      <div>
        Press Create Chart on your course page. Once you press the button, HeaRT
        will ask you what is you goal for playing today
        <br />
        Please tell us why you are playing the game. This helps us understand
        your needs and continue improving HeaRT tool for you!❤️
      </div>
    ),
    image: stepFourImg,
  },
  5: {
    title: "Pick the statement",
    description: (
      <div>
        You will be presented with the first pair of cards. <br /> If the
        statements on the cards are applicable to your course, pick one that
        resonates with you the most 💓 <br /> If the statements are not
        applicable, don't worry, you can edit them to be more specific to your
        course OR you can always skip to the next pair! ⏭️ <br /> You must
        complete at least 8 pairs to finish the game. <br />{" "}
      </div>
    ),
    image: stepFiveImg,
  },
  6: {
    title: "Choose the position on the dimension bar",
    description: (
      <div>
        When you pick a statement you are presented with a dimension bar. You
        need to select your stance on the dimension: how much does your course
        tend towards one card over the other. <br /> For example, is your course
        more teacher-managed, or is it more student-managed? 🤔 <br />
        You can also add a note to explain your choice 📜
      </div>
    ),
    image: stepSixImg,
  },
  7: {
    title: "Preview your chart",
    description: (
      <div>
        Once you went through all teaching dimensions, you can preview your
        answers and go back to any card you would like to edit. <br />
        If you are happy with results, don't hesitate to press 'Save Chart'! 💾
      </div>
    ),
    image: stepSevenImg,
  },
  8: {
    title: "Compare charts",
    description: (
      <div>
        With HeaRT you can also compare up to three charts to each other in
        order to see how they align with each other. To do that, select two or
        more charts on the dashboard and press 'Compare Charts'! <br />
        You can see how your charts stack up to each other on the dimension bar
        for each card - each color corresponds to a chart. You can see the date
        of that chart if you hover over the colored dot! You can also see the
        notes associated with each chart in the tab section.
      </div>
    ),
    image: stepEightImg,
  },
  9: {
    title: "Print paper version of HeaRT",
    description: (
      <div>
        If you would like to use HeaRT in real life, you can always print the
        paper version of the tool! <br />
        To print out cards, press the 🖨️ icon on a chart you would like to print
        cards for. If you are happy with the way it looks, press 'Print' button
        and follow your printer's instructions.
      </div>
    ),
    image: stepNineImg,
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
            <Button
              className="Navigation-Button"
              disabled={instructionsState.currentStep <= 1}
              onClick={(e) => changeStep(-1)}
            >
              <LeftOutlined />
            </Button>
            <span className="Instructions-Image">
              <Image
                width={650}
                src={instructionSteps[instructionsState.currentStep].image}
              />
            </span>
            <Button
              className="Navigation-Button"
              disabled={
                instructionsState.currentStep ===
                Object.keys(instructionSteps).length
              }
              onClick={(e) => changeStep(1)}
            >
              <RightOutlined />
            </Button>
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
