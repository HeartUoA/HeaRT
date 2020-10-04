import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import * as QueryString from "query-string";
import { useCookies } from "react-cookie";

import { Typography, Button, Row, Spin } from "antd";
import Header from "../components/Header";
import PreviewDimension from "../components/PreviewDimension";

import "../styles/Preview.css";
import "../styles/Footer.css";

import { createDimension, Dimension } from "../types/dimension";
import { API_DOMAIN } from "../config";

const Preview: React.FC<RouteComponentProps> = (props) => {
  const params = QueryString.parse(props.location.search);
  const [cookies] = useCookies(["accessToken"]);
  const [selectedDimension, setSelectedDimension] = useState<
    string | undefined
  >(undefined);
  const [saveSingleDimension, setSave] = useState(false);

  // TODO: Need to change this to grab data from backend
  const [dimensions, updateDimensions] = useState<Dimension[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }
  }, [cookies]);

  useEffect(() => {
    fetchDimensions();
  }, []);

  const fetchDimensions = async (): Promise<any> => {
    await fetch(`${API_DOMAIN}dimensions/forchart/` + params.chartID, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies["accessToken"]}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((responseChart) => responseChart.json())
      .then((data) => {
        updateDimensions(
          data.map((dimension: any) => {
            return createDimension(dimension);
          })
        );
      });
  };

  const onSelectDimension = (dimensionKey?: string) => {
    setSelectedDimension(dimensionKey);
  };

  const onBackClick = () => {
    if (selectedDimension) {
      onSelectDimension(undefined);
    } else {
      props.history.push(
        `/DisplayCards/courseID=${params.courseID}&chartID=${params.chartID}`,
        { prevPage: "Preview" }
      );
    }
  };

  const onSaveClick = () => {
    if (selectedDimension) {
      setSave(true);
    } else {
      // TODO: Write code here to make API post request to save chart

      props.history.push("/Replay");
    }
  };

  const onSaveSingleDimension = (updatedDimension: Dimension) => {
    updateDimensions(
      dimensions!.map((item) => {
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
      dimensions!.map((item) => {
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

  if (dimensions) {
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
          <Button
            type="primary"
            className="Footer-Button"
            onClick={onBackClick}
          >
            {selectedDimension ? "Cancel" : "Back"}
          </Button>
          <Button
            type="primary"
            className="Footer-Button Wider-Button"
            onClick={onSaveClick}
          >
            {selectedDimension ? "Save Dimension" : "Save Chart"}
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Preview">
        <Header />
        <div className="Loading-Spinner">
          <Spin size="large" />
        </div>
      </div>
    );
  }
};

export default withRouter(Preview);
