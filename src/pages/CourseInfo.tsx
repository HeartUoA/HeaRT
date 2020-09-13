import React from "react";

import { Button, Input, InputNumber, Layout, Typography } from "antd";

import logo from "../assets/images/logo.svg";
import "../styles/CourseInfo.css";

const CourseInfo: React.FC = () => {
  const onConfirmClick = () => {
    // TODO: Write code here to redirect to cards screen
  };

  const onCancelClick = () => {
    // TODO: Write code here to redirect back to homepage
  };

  return (
    <div className="Course-Info">
      <Layout.Header className="Temp-Header">
        <img src={logo} className="Logo" alt="logo" />
        <Typography className="Logo-Title">HeaRT</Typography>
      </Layout.Header>

      <Layout.Content className="Main-Container">
        <Typography className="Create-Chart-Text">Create Chart</Typography>
        <div className="Form-Container">
          <div>
            <div>
              <Typography className="Form-Text">Course Name</Typography>
              <Input className="Form-Input" name="courseName" />
            </div>
            <div>
              <Typography className="Form-Text">Role in Course</Typography>
              <Input className="Form-Input" name="courseRole" />
            </div>
          </div>
          <div className="Number-Form">
            <div>
              <Typography className="Form-Text">Course Age</Typography>
              <InputNumber
                className="Form-Input Number-Input"
                name="courseName"
                min={0}
                defaultValue={0}
              />
            </div>
            <div className="Cohort-Size-Label">
              <Typography className="Form-Text">Cohort Size</Typography>
              <InputNumber
                className="Form-Input Number-Input Cohort-Size-Input"
                name="courseName"
                min={0}
                defaultValue={0}
              />
            </div>
          </div>
        </div>
        <div className="Button-Container">
          <Button
            type="primary"
            className="Navigation-Button"
            onClick={onConfirmClick}
          >
            <Typography className="Button-Text">Confirm</Typography>
          </Button>
          <Button
            type="primary"
            className="Navigation-Button Cancel-Button"
            onClick={onCancelClick}
          >
            <Typography className="Button-Text">Cancel</Typography>
          </Button>
        </div>
      </Layout.Content>
    </div>
  );
};

export default CourseInfo;
