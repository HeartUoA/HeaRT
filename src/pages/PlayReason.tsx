import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import * as QueryString from "query-string";

import { Button, Layout, Select, Typography, Radio } from "antd";

import Header from "../components/Header";
import "../styles/PlayReason.css";
import TextArea from "antd/lib/input/TextArea";

import { createCourse } from "../types/course";
import { API_DOMAIN } from "../config";

interface ParamTypes {
  chartID: string;
}

const NONE_SELECTED = "A reason for playing the HeaRT Game must be selected";
const NO_TEXT = "Please type in a reason for playing the HeaRT Game";

const PlayReason: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);
  const { chartID } = useParams<ParamTypes>();
  const [state, setState] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [courseName, setCourseName] = useState<string | undefined>(undefined);
  const params = QueryString.parse(props.location.search);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async (): Promise<any> => {
    await fetch(`${API_DOMAIN}course/${params.courseID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies["accessToken"]}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourseName(createCourse(data[0]).name);
      });
  };

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };

  // TODO: Change options
  const radioOptions = ["Option 1", "Option 2", "Option 3", "Other"];

  const onConfirmClick = () => {
    if (state === "") {
      setError(NONE_SELECTED);
    } else if (
      state === radioOptions[radioOptions.length - 1] &&
      !/\S/.test(reason)
    ) {
      setError(NO_TEXT);
    } else {
      props.history.push(
        `/DisplayCards?courseID=${params.courseID}&chartID=${params.chartID}`
      );
    }
  };

  const onCancelClick = () => {
    // Redirect back to previous course charts page
    props.history.push(`/Course/${params.courseID}`);
  };

  return (
    <div className="Course-Info">
      <Header />

      <Layout.Content className="Main-Container">
        <div className="Form-Container">
          <Typography className="Heading-Text">
            Create Chart for {courseName}
          </Typography>
          <div>
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
              <Radio style={radioStyle} value={radioOptions[0]}>
                {radioOptions[0]}
              </Radio>
              <Radio style={radioStyle} value={radioOptions[1]}>
                {radioOptions[1]}
              </Radio>
              <Radio style={radioStyle} value={radioOptions[2]}>
                {radioOptions[2]}
              </Radio>
              <Radio style={radioStyle} value={radioOptions[3]}>
                {radioOptions[3]}
              </Radio>
            </Radio.Group>
            {state === radioOptions[radioOptions.length - 1] ? (
              <TextArea
                className="Play-Reason"
                rows={3}
                placeholder="Enter reason here..."
                onChange={(e) => {
                  setReason(e.target.value);
                  setError("");
                }}
              />
            ) : null}
          </div>

          <div className="Button-Container">
            <Button
              type="primary"
              className="Nav-Button"
              onClick={onCancelClick}
            >
              <Typography className="Button-Font">Cancel</Typography>
            </Button>
            <Button
              type="primary"
              className="Nav-Button"
              onClick={onConfirmClick}
            >
              <Typography className="Button-Font">Confirm</Typography>
            </Button>
            {error ? (
              <Typography className="Error-Message-Text">{error}</Typography>
            ) : (
              <div style={{ height: 40 }} />
            )}
          </div>
        </div>
      </Layout.Content>
    </div>
  );
};

export default withRouter(PlayReason);
