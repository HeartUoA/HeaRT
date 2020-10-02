import React, { useState } from "react";
import { Card, Slider, Typography, Tabs } from "antd";
import "../styles/Dimension.css";
import "../styles/CompareCharts.css";

import moment from "moment";

import { Dimension as DimensionType } from "../types/dimension";
import Dimension from "./Dimension";
const { TabPane } = Tabs;

interface DimensionComparatorProps {
  dimensions: DimensionType[];
  dates: Date[];
  isPreview: boolean;
}

interface labeledMarks {
  [key: number]: any;
}
const colours = {
  0: "#F25555",
  1: "#499DF2",
  2: "#51C240",
};
const DimensionComparator: React.FC<DimensionComparatorProps> = (
  props: DimensionComparatorProps
) => {
  const initialMarks = props.dimensions[0].marks;
  const marks = props.dimensions.map(
    (dimension) => dimension.userSelectedSliderPos
  );
  const labeled: labeledMarks = {};
  marks.forEach((mark, index) => {
    let entry = {};
    if (labeled[mark] !== undefined) {
      entry = {
        style: labeled[mark].style,
        label:
          labeled[mark].label +
          ", " +
          moment(props.dates[index]).format("DD.MM"),
      };
    } else {
      entry = {
        style: { color: Object.values(colours)[index], fontSize: "0.8em" },
        label: moment(props.dates[index]).format("DD.MM"),
      };
    }
    labeled[mark] = entry;
  });
  labeled[0] = {
    label: props.dimensions[0].marks![0],
    style: { marginTop: "1em" },
  };
  labeled[100] = {
    label: props.dimensions[0].marks![100],
    style: { marginTop: "1em" },
  };

  return (
    <Card className={"Card-Compare-Preview"}>
      <p className="Card-Compare-Title">{props.dimensions[0].name}</p>
      <Slider
        className="Card-Compare-Slider"
        marks={labeled}
        tooltipVisible={false}
        included={false}
        disabled={true}
      />
      <Typography className="Card-Compare-Tab-Title">Chart Notes</Typography>
      <Tabs
        className={"Cards-Compare-Tab"}
        defaultActiveKey="1"
        centered={true}
      >
        {props.dimensions.map((dimension, index) => {
          return (
            <TabPane
              tab={moment(props.dates[index]).format("DD.MM")}
              key={index}
            >
              <Typography className="Card-Compare-Explanation">
                {dimension.userExplanation}
              </Typography>
            </TabPane>
          );
        })}
      </Tabs>
    </Card>
  );
};

export default DimensionComparator;
