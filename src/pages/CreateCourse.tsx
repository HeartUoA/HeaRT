import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useCookies } from "react-cookie";
import moment from "moment";

import { API_DOMAIN } from "../config";

import {
  Button,
  Input,
  Layout,
  InputNumber,
  Typography,
  DatePicker,
} from "antd";

import Header from "../components/Header";
import "../styles/CreateCourse.css";

const ALL_FIELDS_SET = "All fields must be filled before proceeding.";

// Users can create a new course in their account by filling out the necessary details. Error-checking is in place to assist the user and notify them of any invalid details.
const CreateCourse: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);
  let [courseName, setCourseName] = useState("");
  let [role, setRole] = useState("");
  let [startYear, setStartYear] = useState<Number | undefined>(undefined);
  let [courseSize, setCourseSize] = useState<String | Number | undefined>(
    undefined
  );
  const [error, setError] = useState("");

  // If user is not logged in, redirect to Login page
  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }
  }, [cookies]);

  // Function to create a new course in the backend given all the conditions are met
  const onConfirmClick = async (): Promise<void> => {
    // Display error if any required fields are missing
    if (!courseName || !role || !startYear || !courseSize) {
      setError(ALL_FIELDS_SET);
      return;
    }

    const course = {
      name: courseName,
      cohortSize: courseSize,
      role: role,
      startYear: startYear,
    };

    // POST request to backend to create chart
    const responseSignup = await fetch(`${API_DOMAIN}course/`, {
      method: "POST",
      body: JSON.stringify(course),
      headers: {
        Authorization: `Bearer ${cookies["accessToken"]}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Return to Dashboard upon successful creation of course
    if (responseSignup.status === 200) {
      setError("");
      props.history.push("/Dashboard");
    }
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
                className={`Course-Input ${
                  error === ALL_FIELDS_SET && !courseName && "Error"
                }`}
                name="courseName"
                placeholder="e.g SOFTENG 761"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>
            <div>
              <Typography className="Course-Label-Text">
                Your role in the course
              </Typography>
              <Input
                className={`Course-Input ${
                  error === ALL_FIELDS_SET && !role && "Error"
                }`}
                name="courseRole"
                placeholder="e.g Course Coordinator"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <div className="Numerical-Input-Container">
              <div className="Numerical-Input">
                <Typography className="Course-Label-Text">
                  Course start year
                </Typography>
                <DatePicker
                  className={`Course-Input ${
                    error === ALL_FIELDS_SET && !startYear && "Error"
                  }`}
                  picker="year"
                  value={startYear && moment().year(startYear.valueOf())}
                  onChange={(e) => setStartYear(e?.year())}
                />
              </div>
              <div className="Numerical-Input">
                <Typography className="Course-Label-Text">
                  Cohort Size
                </Typography>
                <InputNumber
                  className={`Course-Input Cohort-Size ${
                    error === ALL_FIELDS_SET && !courseSize && "Error"
                  }`}
                  type="number"
                  value={courseSize && Number(courseSize)}
                  onChange={(e) => setCourseSize(e)}
                />
              </div>
            </div>
          </div>
          <div className="Course-Button-Container">
            <Button
              type="primary"
              className="Course-Button"
              onClick={onCancelClick}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              className="Course-Button"
              onClick={onConfirmClick}
            >
              Confirm
            </Button>
          </div>
          {error ? (
            <Typography className="Error-Message-Text">{error}</Typography>
          ) : (
            <div style={{ height: 40 }} />
          )}
        </div>
      </Layout.Content>
    </div>
  );
};

export default withRouter(CreateCourse);
