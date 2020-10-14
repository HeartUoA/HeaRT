import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useCookies } from "react-cookie";
import * as QueryString from "query-string";

import { Button, Typography, Radio } from "antd";

import Header from "../components/Header";
import "../styles/PlayReason.css";
import TextArea from "antd/lib/input/TextArea";
import { API_DOMAIN } from "../config";

const NONE_SELECTED = "A reason for playing the HeaRT Game must be selected";
const NO_TEXT = "Please type in a reason for playing the HeaRT Game";

const PlayReason: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);
  const [state, setState] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const params = QueryString.parse(props.location.search);

  const radioOptions = [
    "Designing the course",
    "Reviewing the course's structure",
    "Other",
  ];

  // If user is not logged in, redirect to Login page
  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }
  }, [cookies]);

  // Create a new chart and post the reason if the required fields are filled out
  const onConfirmClick = () => {
    if (state === "") {
      setError(NONE_SELECTED); // No option selected
    } else if (
      state === radioOptions[radioOptions.length - 1] &&
      !/\S/.test(reason)
    ) {
      setError(NO_TEXT); // No description provided for other option
    } else {
      createChart(); // Create chart as conditions are met
    }
  };

  // Creates a new chart in the backend and triggers a PUT request to update the reason of play field in that chart
  const createChart = async (): Promise<any> => {
    await fetch(`${API_DOMAIN}course/${params.courseID}/chart`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies["accessToken"]}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        updateBackendReason(data);
      });
  };

  // PUT request to backend to update the reason of play field in the chart and redirect to play game if successful
  const updateBackendReason = async (data: any): Promise<any> => {
    await fetch(`${API_DOMAIN}chart/${data.chartID}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${cookies["accessToken"]}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...data,
        reasonOfPlay:
          state === radioOptions[radioOptions.length - 1] ? reason : state,
      }),
    }).then((res) => {
      if (res.status === 200) {
        props.history.push(
          `/DisplayCards?courseID=${params.courseID}&chartID=${data.chartID}`,
          { from: "PlayReason" }
        );
      }
    });
  };

  // Redirect back to previous course charts page
  const onCancelClick = () => {
    props.history.push(`/Course/${params.courseID}`);
  };

  return (
    <div className="Play-Reason">
      <Header />

      <div className="Main-Container">
        <div className="Reason-Container">
          <Typography className="Heading-Text">Create Chart</Typography>
          <div className="Reason-Input-Container">
            <Typography className="Subheading-Text">
              Why are you playing the HeaRT game?
            </Typography>
            <Radio.Group
              onChange={(e) => {
                setState(e.target.value);
                setError("");
              }}
              value={state}
            >
              <Radio className="Radio" value={radioOptions[0]}>
                {radioOptions[0]}
              </Radio>
              <Radio className="Radio" value={radioOptions[1]}>
                {radioOptions[1]}
              </Radio>
              <Radio className="Radio" value={radioOptions[2]}>
                {radioOptions[2]}
              </Radio>
            </Radio.Group>
            <TextArea
              className="Reason-Text"
              rows={3}
              placeholder="Enter reason here..."
              onChange={(e) => {
                setReason(e.target.value);
                setError("");
              }}
              disabled={state !== radioOptions[radioOptions.length - 1]}
            />
          </div>

          <div className="Button-Container">
            <Button
              type="primary"
              className="Cancel-Button"
              onClick={onCancelClick}
            >
              <Typography className="Button-Font">Cancel</Typography>
            </Button>
            <Button
              type="primary"
              className="Confirm-Button"
              onClick={onConfirmClick}
            >
              <Typography className="Button-Font">Confirm</Typography>
            </Button>
          </div>
          {error ? (
            <Typography className="Error-Message">{error}</Typography>
          ) : (
            <div style={{ height: 35 }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(PlayReason);
