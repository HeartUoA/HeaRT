import React from "react";
import { Card, Slider, Typography, Tabs, Tooltip } from "antd";
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

// This component is used to compare the responses by multiple charts for one dimension.
// Users can see the chart responses colour coded on the slider as well as click into the user explanations for each chart in that dimension.
const DimensionComparator: React.FC<DimensionComparatorProps> = (
  props: DimensionComparatorProps
) => {
  const marks = props.dimensions.map(
    (dimension) => dimension.userSelectedSliderPos
  );

  // Add dimension positions of all charts that are being compared
  const labeled: labeledMarks = {};
  marks.forEach((mark, index) => {
    let entry = {};
    // Checks if other charts have a users position on the same spot
    // In this case the tooltip will display dates from all of these charts
    if (labeled[mark] !== undefined) {
      entry = {
        style: { color: Object.values(colours)[index], fontSize: "0.8em" },
        label: (
          <Tooltip
            title={
              moment(labeled[mark].value).format("DD MMM YYYY (HH:mmA)") +
              ", " +
              moment(props.dates[index]).format("DD MMM YYYY (HH:mmA)")
            }
            style={{ position: "relative" }}
            color={Object.values(colours)[index]}
          >
            {/* Renders a circle on top of the slider
            This has a very specific set of css rules, so change with care */}
            <div
              className="Card-Compare-Circle"
              style={{
                backgroundColor: Object.values(colours)[index],
              }}
            />{" "}
          </Tooltip>
        ),
        value: [labeled[mark].value, props.dates[index]],
        color: Object.values(colours)[index],
      };
    } else {
      entry = {
        style: { color: Object.values(colours)[index], fontSize: "0.8em" },
        label: (
          <Tooltip
            style={{ position: "relative" }}
            title={moment(props.dates[index]).format("DD MMM YYYY (HH:mmA)")}
            color={Object.values(colours)[index]}
          >
            <div
              className="Card-Compare-Circle"
              style={{
                backgroundColor: Object.values(colours)[index],
              }}
            />
          </Tooltip>
        ),
        // Keep extra info about the chart, so can be used if more than one are rendered at the same spot
        value: props.dates[index],
        color: Object.values(colours)[index],
      };
    }
    labeled[mark] = entry;
  });

  // Add dimension markers for the left and right sides of the slider
  labeled[-0.1] = {
    label: props.dimensions[0].marks![0].label,
    style: { marginTop: "1em" },
  };
  labeled[100.1] = {
    label: props.dimensions[0].marks![100].label,
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
      />
      <Typography className="Card-Compare-Tab-Title">Chart Notes</Typography>
      <Tabs style={{ marginLeft: "1em" }} defaultActiveKey="1" centered={true}>
        {props.dimensions.map((dimension, index) => {
          return (
            <TabPane
              tab={
                <span
                  style={{
                    color: labeled[dimension.userSelectedSliderPos].color,
                  }}
                >
                  {moment(props.dates[index]).format("DD MMM YYYY (HH:mmA)")}
                </span>
              }
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
