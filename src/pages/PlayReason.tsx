import React, { useState } from "react";
import { withRouter, RouteComponentProps, useParams } from "react-router-dom";

import { Button, Layout, Select, Typography, Radio } from "antd";

import Header from "../components/Header";
import "../styles/PlayReason.css";
import TextArea from "antd/lib/input/TextArea";

interface ParamTypes {
  chartID: string;
}

const PlayReason: React.FC<RouteComponentProps> = (props) => {
  const { chartID } = useParams<ParamTypes>();
  const courseName = window.history.state?.state?.courseName;
  const [state, setState] = useState("");
  const [reason, setReason] = useState("");

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };

  const radioOptions = ["Option 1", "Option 2", "Option 3", "Other"];

  const onConfirmClick = () => {
    // if (password !== confirmPassword) {
    //   setError(PASSWORD_MATCH);
    //   return;
    // } else if (
    //   !username ||
    //   !password ||
    //   !password ||
    //   !fullName ||
    //   !institution ||
    //   !dept ||
    //   !position
    // ) {
    //   setError(ALL_FIELDS_SET);
    //   return;
    // }
    // If option "Other" is selected, a reason should be entered (checks for non-whitespace)
    if (state === "") {
      console.log("No option selected");
    } else if (
      state === radioOptions[radioOptions.length - 1] &&
      !/\S/.test(reason)
    ) {
      console.log("Text field empty");
    }
    console.log(state);
    // Redirect to cards screen
    //props.history.push(`/DisplayCards/${chartID}`);
  };

  const onCancelClick = () => {
    // Redirect back to previous course charts page
    props.history.push(window.history.state?.state?.prevPage);
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
              onChange={(e) => setState(e.target.value)}
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
                onChange={(e) => setReason(e.target.value)}
              />
            ) : null}
          </div>

          <div className="Button-Container">
            <Button
              type="primary"
              className="Confirm-Button"
              onClick={onConfirmClick}
            >
              <Typography className="Button-Font">Confirm</Typography>
            </Button>
            <Button
              type="primary"
              className="Cancel-Button"
              onClick={onCancelClick}
            >
              <Typography className="Button-Font">Cancel</Typography>
            </Button>
          </div>
        </div>
      </Layout.Content>
    </div>
  );
};

export default withRouter(PlayReason);
