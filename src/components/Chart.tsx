import React, { useState } from "react";

import { Card, Typography } from "antd";
import "../styles/Chart.css";

import emptyCheckbox from "../assets/images/emptycheckbox.png";
import checkbox from "../assets/images/checkbox.png";

interface ChartProps {
  createdAt: Date;
  chartID: string;
  onChange: Function;
}

const Chart: React.FC<ChartProps> = (props: ChartProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const dateOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const onClick = () => {
    setIsSelected(!isSelected);
    props.onChange(props.chartID, !isSelected);
  };

  return (
    <Card className="Chart-Card" onClick={onClick}>
      <img
        className="Checkbox"
        src={isSelected ? checkbox : emptyCheckbox}
        alt="checkbox"
      />
      <Typography>
        {props.createdAt.toLocaleDateString("en-NZ", dateOptions)}
      </Typography>
    </Card>
  );
};

export default Chart;
