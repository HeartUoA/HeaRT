import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useCookies } from "react-cookie";
import moment from "moment";

import { Button, Input, Layout, InputNumber, Typography, DatePicker } from "antd";

import Header from "../components/Header";
import "../styles/CreateCourse.css";

const CreateCourse: React.FC<RouteComponentProps> = (props) => {
  const [ cookies ] = useCookies(['accessToken']);
  let [ courseName, setCourseName ] = useState("");
  let [ role, setRole ] = useState("");
  let [ startYear, setStartYear ] = useState<Number | undefined>(undefined);
  let [ courseSize, setCourseSize ] = useState<String | Number | undefined>(undefined);

  useEffect(() => {
    if (!cookies['accessToken']) {
      props.history.push("/Login");
    }
  }, [cookies]);

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
                value={courseName}
                onChange={e => setCourseName(e.target.value)}
              />
            </div>
            <div>
              <Typography className="Course-Label-Text">Your role in the course</Typography>
              <Input
                className="Course-Input"
                name="courseRole"
                placeholder="e.g Course Coordinator"
                value={role}
                onChange={e => setRole(e.target.value)}
              />
            </div>
            <div className="Numerical-Input-Container">
              <div className="Numerical-Input">
                <Typography className="Course-Label-Text">Course start year</Typography>
                <DatePicker className="Course-Input" picker="year" value={startYear && moment().year(startYear.valueOf())} onChange={e => setStartYear(e?.year())} />
              </div>
              <div className="Numerical-Input">
                <Typography className="Course-Label-Text">Cohort Size</Typography>
                <InputNumber className="Course-Input Cohort-Size" type="number" value={courseSize && Number(courseSize)} onChange={e => setCourseSize(e)}/>
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
