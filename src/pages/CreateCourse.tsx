import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom"

import { Button, Input, Layout, InputNumber, Typography, DatePicker } from "antd";

import Header from "../components/Header";
import "../styles/CreateCourse.css";

const CreateCourse: React.FC<RouteComponentProps> = (props) => {
  const onConfirmClick = () => {
    // TODO: Write code here to create new course (post request)
    props.history.push("/Dashboard");
  };

  const onCancelClick = () => {
    props.history.push("/Dashboard");
  };

  return (
    <div className="Create-Course">
      <Header />

      <Layout.Content className="Create-Course-Content">
        <div className="Form-Container">
          <Typography className="Create-Course-Title">Create Course</Typography>
          <div className="Course-Input-Container">
            <div>
              <Typography className="Course-Label-Text">Course name</Typography>
              <Input
                className="Course-Input"
                name="courseName"
                placeholder="e.g SOFTENG 761"
              />
            </div>
            <div>
              <Typography className="Course-Label-Text">Your role in the course</Typography>
              <Input
                className="Course-Input"
                name="courseRole"
                placeholder="e.g Course Coordinator"
              />
            </div>
            <div className="Numerical-Input-Container">
              <div className="Numerical-Input">
                <Typography className="Course-Label-Text">Course start year</Typography>
                <DatePicker className="Course-Input" picker="year" />
              </div>
              <div className="Numerical-Input">
                <Typography className="Course-Label-Text">Cohort Size</Typography>
                <InputNumber className="Course-Input Cohort-Size" type="number"/>
              </div>
            </div>
          </div>
          <div className="Course-Button-Container">
            <Button
              type="primary"
              className="Course-Button"
              onClick={onConfirmClick}
            >
              Confirm
            </Button>
            <Button
              type="primary"
              className="Course-Button"
              onClick={onCancelClick}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Layout.Content>
    </div>
  );
};

export default withRouter(CreateCourse);
