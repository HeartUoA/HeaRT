import React, { useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Button, Row, Typography } from "antd";

import Header from "../components/Header";
import Instructions from "../components/Instructions";
import Course from "../components/Course";
import "../styles/Dashboard.css";

import courses from "../dummyData/courses";
import plus from "../assets/images/plus.png";

const Dashboard: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [dashboardCardsMargin, setMargin] = useState(
    (window.innerWidth % 500) / 2
  );

  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }
  }, [cookies]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onInstructionsClick = () => {
    setShowInstructions(!showInstructions);
  };

  const createNewCourse = () => {
    props.history.push("/CreateCourse");
  };

  const handleResize = () => {
    setMargin((window.innerWidth % 500) / 2);
  };

  return (
    <div className="Dashboard">
      <Header />
      <Instructions visible={showInstructions} hide={onInstructionsClick} />
      <div className="Dashboard-Content">
        <Typography className="Courses-Heading">Courses</Typography>
        <Button
          type="primary"
          className="Instructions-Button"
          onClick={onInstructionsClick}
        >
          How to play
        </Button>
      </div>
      <div className="Dashboard-Cards">
        <Row
          className="Course-Row"
          style={{
            marginLeft: dashboardCardsMargin,
            marginRight: dashboardCardsMargin,
          }}
        >
          <Button className="Create-Course-Button" onClick={createNewCourse}>
            <img src={plus} className="Plus-Image" alt="plus" />
            <Typography>Create New Course</Typography>
          </Button>
          {courses.map((item) => {
            return (
              <Course
                {...{
                  courseName: item.name,
                  key: item.id,
                }}
              />
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
