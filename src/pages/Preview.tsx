import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import * as QueryString from "query-string";
import { useCookies } from "react-cookie";

import { Typography, Button, Row, Spin } from "antd";
import Header from "../components/Header";
import PreviewDimension from "../components/PreviewDimension";

import "../styles/Preview.css";
import "../styles/Footer.css";

import {
  createDimension,
  Dimension,
  createBackendDimension,
} from "../types/dimension";
import { API_DOMAIN, MINIMUM_REQUIRED } from "../config";

const Preview: React.FC<RouteComponentProps> = (props) => {
  const params = QueryString.parse(props.location.search);
  const [cookies] = useCookies(["accessToken"]);
  const [selectedDimension, setSelectedDimension] = useState<
    string | undefined
  >(undefined);
  const [saveSingleDimension, setSave] = useState(false);
  const [requirementsMet, setRequirementsMet] = useState(false);

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

  useEffect(() => {
    fetchRequirementsMet();
  }, [dimensions]);

  const fetchRequirementsMet = () => {
    let completedTasks = 0;
    dimensions?.map((item) => {
      if (item.userSelectedSliderPos !== -1) {
        completedTasks += 1;
      }
    });
    if (completedTasks >= MINIMUM_REQUIRED) {
      setRequirementsMet(true);
    }
  };

  const fetchDimensions = async (): Promise<any> => {
    await fetch(`${API_DOMAIN}dimensions/forchart/` + params.chartID, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies["accessToken"]}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          updateDimensions([]);
          props.history.push("/Dashboard");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        data &&
          updateDimensions(
            data.map((dimension: any) => {
              return createDimension(dimension);
            })
          );
      })
      .catch((e) => console.log(e));
  };

  const onSelectDimension = (dimensionKey?: string) => {
    setSelectedDimension(dimensionKey);
  };

  const onBackClick = () => {
    if (selectedDimension) {
      onSelectDimension(undefined);
    } else {
      props.history.push(
        `/DisplayCards?courseID=${params.courseID}&chartID=${params.chartID}`,
        { prevPage: "Preview" }
      );
    }
  };

  const onSaveClick = () => {
    if (selectedDimension) {
      setSave(true);
    } else {
      dimensions?.map((item) => {
        saveOneDimension(item);
      });

      updateProgress();
      props.history.push(`/Replay?courseID=${params.courseID}`);
    }
  };

  const updateProgress = async () => {
    await fetch(`${API_DOMAIN}chart/${params.chartID}`, {
      method: "PUT",
      body: JSON.stringify({ isComplete: true }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies["accessToken"]}`,
        Accept: "application/json",
      },
    });
  };

  const saveOneDimension = async (cardDimension: Dimension) => {
    const dimension = createBackendDimension(cardDimension);
    await fetch(`${API_DOMAIN}dimensions/` + dimension.id, {
      method: "PUT",
      body: JSON.stringify(dimension),
      headers: {
        Authorization: `Bearer ${cookies["accessToken"]}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
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
            disabled={!requirementsMet}
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
