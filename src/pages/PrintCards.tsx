import React, { constructor, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Button, Input, Typography } from "antd";
import Header from "../components/Header";
import "../styles/PrintCards.css";
import { API_DOMAIN } from "../config";

type statementCard = {
  text: string;
};

const initialStatementCard: statementCard = {
  text: "Lorem ipsm dolor sit amet, consectetuer adipiscing elit, sed diam",
};

const chartID = "5f73179eff72273a1c5205ca";

//dummy data
type DimensionCard = {
  dimensionName: string;
  leftContinuum: string;
  rightContinuum: string;
  statementReflection: string;
};

const initialDimensionCard: DimensionCard = {
  dimensionName: "Nature & purpose of learning tasks",
  leftContinuum: "Academic/abstract",
  rightContinuum: "Authentic/experimental",
  statementReflection: "'Academic/abstract' purpose",
};

const PrintCards: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);
  const [leftState, setLeftState] = useState(initialStatementCard);

  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }
    fetch(`${API_DOMAIN}dimensions/forchart/${chartID}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1ZjcxODRjOThhYWQ1MzUxOTg1ZDJkMzAiLCJpYXQiOjE2MDEyNzUxMDh9.0MN9vV7WRSc-m5hpt3t8mJakVNElJHe4a2fuc1-aFcs",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLeftState({
          text: res[0].leftCardStatement,
        });
        console.log(res);
      })
      .catch((e) => console.log(e));
  }, [cookies]);

  const renderComponent = (number: string) => async (): Promise<void> => {
    console.log(number);
    console.log("HELLO");
    setLeftState({
      text: "LOL",
    });
  };
  const onBackClick = async (): Promise<void> => {
    // TODO: Write code here to redirect back to create account page
    // props.history.push("URL-HERE")
    props.history.push("/Dashboard");
  };
  return (
    <div className="PrintCards">
      <div className="Header">
        <Header></Header>
      </div>
      <div className="PrintCardsContainer">
        <div className="PrintCardsContent">
          <div className="PrintingCards">
            <span className="Print-Card-Text">{leftState.text}</span>
          </div>
          <div className="PrintingCards">
            <span className="Print-Card-Text">{leftState.text}</span>
          </div>
          <div className="PrintingCards">
            <p>3</p>
          </div>
          <div className="PrintingCards">
            <p>4</p>
          </div>
          <div className="PrintingCards">
            <p>5</p>
          </div>
          <div className="PrintingCards">
            <p>6</p>
          </div>
          <div className="PrintingCards">
            <p>7</p>
          </div>
          <div className="PrintingCards">
            <p>8</p>
          </div>
          <div className="PrintingCards">
            <p>9</p>
          </div>
          <div className="PrintingCards">
            <p>10</p>
          </div>
          <div className="PrintingCards">
            <p>11</p>
          </div>
          <div className="PrintingCards">
            <p>12</p>
          </div>
          <div className="PrintingCards">
            <p>13</p>
          </div>
          <div className="PrintingCards">
            <p>14</p>
          </div>
        </div>
      </div>
      <div className="BackButtonDiv">
        <Button type="primary" className="Back-Button" onClick={onBackClick}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default withRouter(PrintCards);
