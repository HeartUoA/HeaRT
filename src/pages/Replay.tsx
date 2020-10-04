import React, { useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useCookies } from "react-cookie";
import * as QueryString from "query-string";

import Header from "../components/Header";
import { Button, Typography } from "antd";
import "../styles/Replay.css";
import { API_DOMAIN } from "../config";

const Replay: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);
  const params = QueryString.parse(props.location.search);

  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }
  }, [cookies]);

  useEffect(() => {
    checkCourseExists();
  }, []);

  const checkCourseExists = async (): Promise<any> => {
    await fetch(`${API_DOMAIN}course/${params.courseID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies["accessToken"]}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      if (res.status !== 200) {
        props.history.push("/Dashboard");
      }
    });
  };

  const playAgainForSameCourse = async (): Promise<any> => {
    // TODO: Need to redirect to Reason of Play once that is done
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
        props.history.push(
          `/DisplayCards?courseID=${params.courseID}&chartID=${data.chartID}`
        );
      });
  };

  const goToDashboard = () => {
    props.history.push("/Dashboard");
  };

  return (
    <div className="Replay">
      <Header />
      <div className="Replay-Content">
        <div className="Replay-Options-Panel">
          <Typography className="Success-Text">
            Your chart has been saved!
          </Typography>
          <div className="Replay-Buttons-Container">
            <Button className="Replay-Button" onClick={playAgainForSameCourse}>
              Play again for this course
            </Button>
            <Button className="Replay-Button" onClick={goToDashboard}>
              Return to dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Replay);
