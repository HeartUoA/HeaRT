import React from "react";
import { Card, Slider, Typography, Tabs } from "antd";
import "../styles/Dimension.css";
import "../styles/CompareCharts.css";
import moment from "moment";

import { Dimension as DimensionType } from "../types/dimension";
const { TabPane } = Tabs;

interface DimensionComparatorProps {
  dimensions: DimensionType[];
  dates: Date[];
  isPreview: boolean;
}

interface labeledMarks {
  [key: number]: any;
}

// Add more colours to compare more charts (current limit is 3)
const colours = {
  0: "#F25555",
  1: "#499DF2",
  2: "#51C240",
};
const DimensionComparator: React.FC<DimensionComparatorProps> = (
  props: DimensionComparatorProps
) => {
  const marks = props.dimensions.map(
    (dimension) => dimension.userSelectedSliderPos
  );

  // Add marks of all charts that are being compared
  const labeled: labeledMarks = {};
  marks.forEach((mark, index) => {
    let entry = {};
    if (labeled[mark] !== undefined) {
      entry = {
        style: { color: Object.values(colours)[index], fontSize: "0.8em" },
        label: (
          <span style={{ position: "relative" }}>
            <div
              className="Card-Compare-Circle"
              style={{
                backgroundColor: Object.values(colours)[index],
              }}
            />{" "}
            {/* If more than one chart has marker at the same spot, their dates are displayed together */}
            <span style={{ paddingLeft: "1em" }}>
              {moment(labeled[mark].value).format("DD.MM") +
                ", " +
                moment(props.dates[index]).format("DD.MM")}
            </span>
          </span>
        ),
      };
    } else {
      entry = {
        style: { color: Object.values(colours)[index], fontSize: "0.8em" },
        label: (
          <span style={{ position: "relative" }}>
            <div
              className="Card-Compare-Circle"
              style={{
                backgroundColor: Object.values(colours)[index],
              }}
            />{" "}
            <span style={{ paddingLeft: "1em" }}>
              {moment(props.dates[index]).format("DD.MM")}
            </span>
          </span>
        ),
        value: props.dates[index],
      };
    }
    labeled[mark] = entry;
  });

  // Add markers for the left and right sides of the slider
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
      <Tabs style={{ marginLeft: "1em" }} defaultActiveKey="1" centered={true}>
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
