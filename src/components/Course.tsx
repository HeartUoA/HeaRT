import React from "react";

import { Card, Typography } from "antd";
import "../styles/Course.css";

interface CourseProps {
  courseName: string;
}

const Dimension: React.FC<CourseProps> = (props: CourseProps) => {
  const onClick = () => {
    // TODO: Redirect to appropriate course page
  };

  return (
    <Card className="Course-Card" onClick={onClick}>
      <Typography className="Course-Title">{props.courseName}</Typography>
    </Card>
  );
};

export default Dimension;
