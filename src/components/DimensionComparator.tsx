import React, { ChangeEvent, JSXElementConstructor } from "react";

import { Card, Slider, Typography } from "antd";
import "../styles/Dimension.css";
import "../styles/DimensionComparator.css";

import moment from "moment";

import { Dimension as DimensionType } from "../types/dimension";

interface DimensionComparatorProps {
  dimensions: DimensionType[];
  dates: Date[];
  isPreview: boolean;
  selectedDimension?: number;
}

interface labeledMarks {
  [key: number]: any;
}
const DimensionComparator: React.FC<DimensionComparatorProps> = (
  props: DimensionComparatorProps
) => {
  const marks = props.dimensions.map(
    (dimension) => dimension.userSelectedSliderPos
  );
  const labeled: labeledMarks = {};
  marks.forEach((mark, index) => {
    if (labeled[mark] !== undefined) {
      labeled[mark] =
        labeled[mark] + ", " + moment(props.dates[index]).format("DD.MM");
    } else {
      labeled[mark] = moment(props.dates[index]).format("DD.MM");
    }
  });

  console.log("These are the marks " + JSON.stringify(labeled));
  return (
    <Card className={"Card-Compare-Preview"}>
      <p className="Dimension-Name-Text">{props.dimensions[0].name}</p>
      {props.dimensions.map((dimension) => {
        return (
          <Slider
            className="Slider Card-Compare-Slider"
            value={dimension.userSelectedSliderPos}
            tooltipVisible={false}
            included={false}
            disabled={false}
          />
        );
      })}
      <Slider
        className="Slider Card-Compare-Slider"
        marks={labeled}
        value={marks[0]}
        tooltipVisible={false}
        included={false}
        disabled={false}
      />
    </Card>
  );
};

export default DimensionComparator;
