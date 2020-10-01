import React, { useEffect, useState } from "react";
import { withRouter, RouteComponentProps, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Button, Row, Typography } from "antd";

import Header from "../components/Header";
import Instructions from "../components/Instructions";
import Chart from "../components/Chart";
import "../styles/Dashboard.css";
import "../styles/Footer.css";

import charts from "../dummyData/charts";
import courses from "../dummyData/courses";
import plus from "../assets/images/plus.png";

interface ParamTypes {
  courseID: string;
}

const Charts: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [dashboardCardsMargin, setMargin] = useState(
    (window.innerWidth % 500) / 2
  );
  const { courseID } = useParams<ParamTypes>();
  const [selectedCharts, setCharts] = useState<string[]>([]);

  // TODO change this to get coursename from backend
  let course = courses.find((item) => item.id === courseID);
  let courseName;
  if (course) {
    courseName = course.name;
  } else {
    courseName = "Coursename not found";
  }

  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }
  }, [cookies]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onInstructionsClick = () => {
    setShowInstructions(!showInstructions);
  };

  const createChart = () => {
    //props.history.push("/DisplayCards/" + courseID);
    //Need to go to play reason page then this one ^
  };

  const handleResize = () => {
    setMargin((window.innerWidth % 500) / 2);
  };

  const onBackClick = () => {
    props.history.push("/Dashboard");
  };

  const onCompare = () => {
    // TODO Compare charts (ID's stored in selectedCharts array)
    console.log(selectedCharts);
  };

  const onChartSelected = (chartID: string, isSelected: boolean) => {
    let tempCharts = Object.assign([], selectedCharts);
    if (isSelected) {
      tempCharts.push(chartID);
    } else {
      const index = tempCharts.indexOf(chartID, 0);
      if (index > -1) {
        tempCharts.splice(index, 1);
      }
    }
    setCharts({ ...tempCharts });
  };

  return (
    <div className="Charts-Dashboard">
      <Header />
      <Instructions visible={showInstructions} hide={onInstructionsClick} />
      <div className="Dashboard-Content">
        <Typography className="Heading">{courseName + " Charts"}</Typography>
        <Button
          type="primary"
          className="Instructions-Button"
          onClick={onInstructionsClick}
        >
          How to play
        </Button>
      </div>
      <div className="Dashboard-Cards">
        <Row
          className="Chart-Row"
          style={{
            marginLeft: dashboardCardsMargin,
            marginRight: dashboardCardsMargin,
          }}
        >
          <Button className="Create-Button" onClick={createChart}>
            <img src={plus} className="Plus-Image" alt="plus" />
            <Typography>New Chart</Typography>
          </Button>
          {charts.map((item) => {
            if (item.courseID === courseID) {
              return (
                <Chart
                  {...{
                    createdAt: item.createdAt,
                    chartID: item.id,
                    isSelected: false,
                    onChange: onChartSelected,
                    key: item.id,
                  }}
                />
              );
            }
            return null;
          })}
        </Row>
      </div>
      <div className="Footer">
        <Button type="primary" className="Footer-Button" onClick={onBackClick}>
          Back
        </Button>
        <Button
          type="primary"
          className="Footer-Button"
          onClick={onCompare}
          disabled={Object.assign([], selectedCharts).length < 2}
        >
          Compare
        </Button>
      </div>
    </div>
  );
};

export default withRouter(Charts);
