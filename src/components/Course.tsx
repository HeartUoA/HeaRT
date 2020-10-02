import React from "react";
import { useHistory } from "react-router-dom";

import { Card, Typography } from "antd";
import "../styles/Course.css";

interface CourseProps {
  courseName: string;
  courseID: string;
}

const Course: React.FC<CourseProps> = (props: CourseProps) => {
  let history = useHistory();

  const onClick = () => {
    history.push(`/Course/${props.courseID}`);
  };

  return (
    <Card className="Course-Card" onClick={onClick}>
      <Typography className="Course-Title">{props.courseName}</Typography>
    </Card>
  );
};

export default Course;
