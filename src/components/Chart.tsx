import React, { useState } from "react";

import { Card, Typography } from "antd";
import "../styles/Chart.css";

import emptyCheckbox from "../assets/images/emptycheckbox.png";
import checkbox from "../assets/images/checkbox.png";

interface ChartProps {
  createdAt: Date;
  chartID: string;
  isSelected: boolean;
  onChange: Function;
}

const Chart: React.FC<ChartProps> = (props: ChartProps) => {
  const [chartProps, setChartProps] = useState(props);

  const dateOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const onClick = () => {
    let isSelected = !chartProps.isSelected;
    setChartProps({ ...chartProps, isSelected: isSelected });
    chartProps.onChange(chartProps.chartID, isSelected);
  };

  return (
    <Card className="Chart-Card" onClick={onClick}>
      <img
        className="Checkbox"
        src={chartProps.isSelected ? checkbox : emptyCheckbox}
        alt="checkbox"
      />
      <Typography>
        {chartProps.createdAt.toLocaleDateString("en-NZ", dateOptions)}
      </Typography>
    </Card>
  );
};

export default Chart;
