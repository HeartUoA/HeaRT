import React, { useState } from "react";

import { Card, Typography } from "antd";
import "../styles/Chart.css";

import emptyCheckbox from "../assets/images/checkbox-empty.svg";
import checkbox from "../assets/images/checkbox-ticked.svg";
import printbox from "../assets/images/printbox.png";

interface ChartProps {
  history: any;
  createdAt: Date;
  chartID: string;
  courseID: string;
  onChange: Function;
  isComplete: boolean;
  onCardClick: (chartID: string, isComplete: boolean) => void;
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

  // Toggles the checkbox image on the chart
  const onCheckboxClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsSelected(!isSelected);
    props.onChange(props.chartID, !isSelected);
  };

  // Redirects to print cards page for the chart
  const onPrintClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    props.history.push(
      `/PrintCards?courseID=${props.courseID}&chartID=${props.chartID}`
    );
  };

  return (
    <Card
      key={props.chartID}
      className="Chart-Card"
      onClick={() => props.onCardClick(props.chartID, props.isComplete)}
    >
      {!props.isComplete && <div className="Incomplete-Tag">Incomplete</div>}
      <img
        className="Printbox Enabled"
        src={printbox}
        alt="printbox"
        onClick={(event) => onPrintClick(event)}
      />
      <img
        className={`${isSelected ? "Ticked-Checkbox" : "Empty-Checkbox"} ${
          props.isComplete ? "Enabled" : "Disabled"
        }`}
        src={isSelected ? checkbox : emptyCheckbox}
        alt="checkbox"
        onClick={(event) => props.isComplete && onCheckboxClick(event)}
      />
      <Typography>
        {props.createdAt.toLocaleDateString("en-NZ", dateOptions)}
      </Typography>
    </Card>
  );
};

export default Chart;
