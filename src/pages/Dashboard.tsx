import React, { useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Button, Row, Typography, Spin } from "antd";
import Header from "../components/Header";
import Instructions from "../components/Instructions";
import Course from "../components/Course";

import { API_DOMAIN } from "../config";

import { Course as CourseType, createCourse } from "../types/course";

import "../styles/Dashboard.css";

import plus from "../assets/images/plus.png";

// Users can view their courses here and make new courses. They can also view the instructions on how to play the HeaRT game.
const Dashboard: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [dashboardCardsMargin, setMargin] = useState(
    (window.innerWidth % 500) / 2
  );
  const [courses, setCourses] = useState<CourseType[] | undefined>(undefined);

  // If user is not logged in, redirect to Login page
  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }
  }, [cookies]);

  // Fetch data from backend upon component mounting
  useEffect(() => {
    fetchCourses();
  }, []);

  // Function to dynamically change margins of the page as the window viewport size changes
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Gets all courses created by the user from the backend
  const fetchCourses = async (): Promise<any> => {
    await fetch(`${API_DOMAIN}course/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies["accessToken"]}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status === 404) {
          setCourses([]);
        } else if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        data &&
          setCourses(
            data.map((course: any) => {
              return createCourse(course);
            })
          );
      })
      .catch((e) => console.log(e));
  };

  // Toggles instructions modal visibility
  const onInstructionsClick = () => {
    setShowInstructions(!showInstructions);
  };

  const createNewCourse = () => {
    props.history.push("/CreateCourse");
  };

  // Changes the margin size of the page
  const handleResize = () => {
    setMargin((window.innerWidth % 500) / 2);
  };

  if (courses) {
    return (
      <div className="Courses-Dashboard">
        <Header />
        <Instructions visible={showInstructions} hide={onInstructionsClick} />
        <div className="Dashboard-Content">
          <Typography className="Heading">Courses</Typography>
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
            <Button className="Create-Button" onClick={createNewCourse}>
              <img src={plus} className="Plus-Image" alt="plus" />
              <Typography>Create New Course</Typography>
            </Button>
            {courses.map((item) => {
              return (
                <Course
                  {...{
                    courseName: item.name,
                    courseID: item.id,
                    key: item.id,
                  }}
                />
              );
            })}
          </Row>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Courses-Dashboard">
        <Header />
        <div className="Loading-Spinner">
          <Spin size="large" />
        </div>
      </div>
    );
  }
};

export default withRouter(Dashboard);
