import React, { useEffect, useState } from "react";
import { withRouter, RouteComponentProps, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Button, Row, Typography, Spin } from "antd";
import Header from "../components/Header";
import Instructions from "../components/Instructions";
import Chart from "../components/Chart";

import { StubChart, createStubChart } from "../types/chart";
import { createCourse } from "../types/course";
import { API_DOMAIN } from "../config";

import "../styles/Dashboard.css";
import "../styles/Footer.css";

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
  const [charts, setCharts] = useState<StubChart[] | undefined>(undefined);
  const [courseName, setCourseName] = useState<string | undefined>(undefined);
  const [selectedCharts, setSelectedCharts] = useState<string[]>([]);

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

  useEffect(() => {
    fetchCharts();
  }, []);

  const fetchCharts = async (): Promise<any> => {
    await fetch(`${API_DOMAIN}course/${courseID}`, {
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

    await fetch(`${API_DOMAIN}course/${courseID}/chart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies["accessToken"]}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status === 404) {
          setCharts([]);
        } else if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        data &&
          setCharts(
            data.map((chart: any) => {
              return createStubChart(chart);
            })
          );
      });
  };

  const onInstructionsClick = () => {
    setShowInstructions(!showInstructions);
  };

  const createChart = async (): Promise<any> => {
    await fetch(`${API_DOMAIN}course/${courseID}/chart`, {
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
        // TODO: Change this to redirect to reason of play field first once reason of play screen is implemented
        props.history.push(
          `/DisplayCards?courseID=${courseID}&chartID=${data.chartID}`
        );
      });
  };

  const handleResize = () => {
    setMargin((window.innerWidth % 500) / 2);
  };

  const onBackClick = () => {
    props.history.push("/Dashboard");
  };

  const onCompare = () => {
    // TODO Compare charts (ID's stored in selectedCharts array)
    props.history.push("/CompareCharts");
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
    setSelectedCharts({ ...tempCharts });
  };

  const onChartClick = (chartID: string) => {
    props.history.push(`/DisplayCards?courseID=${courseID}&chartID=${chartID}`);
  };

  if (charts && courseName) {
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
              return (
                <Chart
                  {...{
                    createdAt: item.createdAt,
                    chartID: item.id,
                    onChange: onChartSelected,
                    key: item.id,
                    onCardClick: onChartClick,
                  }}
                />
              );
            })}
          </Row>
        </div>
        <div className="Footer">
          <Button
            type="primary"
            className="Footer-Button"
            onClick={onBackClick}
          >
            Back
          </Button>
          <Button
            type="primary"
            className="Footer-Button Wider-Button"
            onClick={onCompare}
            disabled={Object.assign([], selectedCharts).length < 2}
          >
            Compare Charts
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Charts-Dashboard">
        <Header />
        <div className="Loading-Spinner">
          <Spin size="large" />
        </div>
      </div>
    );
  }
};

export default withRouter(Charts);
