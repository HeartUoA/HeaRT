import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Typography, Button, Row } from "antd";
import Header from "../components/Header";
import PreviewDimension from "../components/PreviewDimension";

import "../styles/Preview.css";
import "../styles/Footer.css";

import charts from "../dummyData/charts";
import { Dimension } from "../types/dimension";

const Preview: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);
  const [selectedDimension, setSelectedDimension] = useState<
    string | undefined
  >(undefined);
  const [saveSingleDimension, setSave] = useState(false);

  // TODO: Need to change this to grab data from backend
  const [dimensions, updateDimensions] = useState(charts[0].dimensions);

  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }
  }, [cookies]);

  const onSelectDimension = (dimensionKey?: string) => {
    setSelectedDimension(dimensionKey);
  };

  const onBackClick = () => {
    if (selectedDimension) {
      onSelectDimension(undefined);
    } else {
      props.history.push("/DisplayCards");
    }
  };

  const onSaveClick = () => {
    if (selectedDimension) {
      setSave(true);
    } else {
      // TODO: Write code here to make API post request to save chart
      charts[0].dimensions = dimensions;

      props.history.push("/Replay");
    }
  };

  const onSaveSingleDimension = (updatedDimension: Dimension) => {
    updateDimensions(
      dimensions.map((item) => {
        if (item.name === updatedDimension.name) {
          return updatedDimension;
        } else {
          return item;
        }
      })
    );
    onSelectDimension(undefined);
    setSave(false);
  };

  const previewSliderPosChange = (value: number, dimensionKey: string) => {
    updateDimensions(
      dimensions.map((item) => {
        if (item.name === dimensionKey) {
          return {
            ...item,
            userSelectedSliderPos: value,
          };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <div className="Preview">
      <Header />
      <div className="Preview-Content">
        {!selectedDimension && (
          <Typography className="Preview-Title">Preview</Typography>
        )}
        <Row className="Dimension-Row">
          {dimensions.map((item) => {
            if (
              item.userSelectedSliderPos !== -1 &&
              (!selectedDimension || selectedDimension === item.name)
            ) {
              return (
                <PreviewDimension
                  {...{
                    fullDimensionView: item.name === selectedDimension,
                    dimension: item,
                    saveDimensionFunction: onSaveSingleDimension,
                    saveDimensionClicked: saveSingleDimension,
                    openSingleDimension: onSelectDimension,
                    previewSliderPosChange: previewSliderPosChange,
                    key: item.name,
                  }}
                />
              );
            }
            return undefined;
          })}
        </Row>
      </div>
      <div className="Footer">
        <Button type="primary" className="Footer-Button" onClick={onBackClick}>
          {selectedDimension ? "Cancel" : "Back"}
        </Button>
        <Button type="primary" className="Footer-Button" onClick={onSaveClick}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default withRouter(Preview);
