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

// Users can preview all their responses and make changes if necessary.
// Dimensions can be edited individually by clicking on the dimension name.
// (Users must click "Save Chart" for their changes to be saved).
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

  // If user is not logged in, redirect to Login page
  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }
  }, [cookies]);

  // Fetch data from backend on component mount
  useEffect(() => {
    fetchDimensions();
  }, []);

  // Once the dimensions are retrieved, check whether the minimum required dimensions have been completed
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

  // Retrieves the dimensions for the chart from the backend
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

  // Opens a preview dimension in "Full View" mode so that the user explanation can also be modified and the card statements are visible
  const onSelectDimension = (dimensionKey?: string) => {
    setSelectedDimension(dimensionKey);
  };

  // Return to Display Cards (the game)
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

  // Save the chart and redirect to Replay page
  const onSaveClick = () => {
    if (selectedDimension) {
      setSave(true);
    } else {
      // Individually update each dimension on save
      dimensions?.map((item) => {
        saveOneDimension(item);
      });

      updateProgress();
      props.history.push(`/Replay?courseID=${params.courseID}`);
    }
  };

  // Updates the chart to be completed in the backend
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

  // Updates the data for the dimension in the backend
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

  // Locally saves the changes made to a dimension in "Full View" mode and return to preview mode (to see all dimensions)
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

  // Function to save the new slider positions for a dimension locally
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
                (!selectedDimension || selectedDimension === item.id)
              ) {
                return (
                  <PreviewDimension
                    {...{
                      fullDimensionView: item.id === selectedDimension,
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
