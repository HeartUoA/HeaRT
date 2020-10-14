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

// Users can view the charts they have previously created for a course as well as create a new chart to play the HeaRT game.
// From this page, they can also compare charts for the same course and print the cards to play the game in-person.
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

  // If user is not logged in, redirect to Login page
  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }
  }, [cookies]);

  // Function to dynamically change margins of the page as the window viewport size changes
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fetches data from backend upon the component mounting
  useEffect(() => {
    fetchCharts();
  }, []);

  // Function to fetch the coursename and charts under that course from the backend
  const fetchCharts = async (): Promise<any> => {
    // Get course name and set it in state
    await fetch(`${API_DOMAIN}course/${courseID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies["accessToken"]}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          props.history.push("/Dashboard");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        data && setCourseName(createCourse(data[0]).name);
      });

    // Get charts and set them in state
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

  // Toggle instructions modal visibility
  const onInstructionsClick = () => {
    setShowInstructions(!showInstructions);
  };

  const redirectToCreateNewChart = () => {
    props.history.push(`/CreateChart?courseID=${courseID}`);
  };

  // Changes page margin size
  const handleResize = () => {
    setMargin((window.innerWidth % 500) / 2);
  };

  const onBackClick = () => {
    props.history.push("/Dashboard");
  };

  // Redirects to Compare Charts page, passing in IDs of charts to be compared
  const onCompare = () => {
    props.history.push(`/CompareCharts?courseID=${courseID}`, {
      chartIDs: selectedCharts,
    });
  };

  // Adds or removes the specified chart to/from the list of charts selected for comparison
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

  // Redirects chart to the appropriate page depending on whether it is completed.
  const onChartClick = (chartID: string, isComplete: boolean) => {
    if (isComplete) {
      props.history.push(`/Preview?courseID=${courseID}&chartID=${chartID}`, {
        from: "Charts",
      });
    } else {
      props.history.push(
        `/DisplayCards?courseID=${courseID}&chartID=${chartID}`,
        { from: "Charts" }
      );
    }
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
            <Button
              className="Create-Button"
              onClick={redirectToCreateNewChart}
            >
              <img src={plus} className="Plus-Image" alt="plus" />
              <Typography>New Chart</Typography>
            </Button>
            {charts.map((item) => {
              return (
                <Chart
                  {...{
                    history: props.history,
                    createdAt: item.createdAt,
                    chartID: item.id,
                    courseID: item.courseID,
                    onChange: onChartSelected,
                    isComplete: item.isComplete,
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
