import React, { useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import * as QueryString from "query-string";
import { useCookies } from "react-cookie";

import { Typography, Button, Col, Spin } from "antd";
import Header from "../components/Header";
import DimensionComparator from "../components/DimensionComparator";

import "../styles/Preview.css";
import "../styles/Footer.css";

import { API_DOMAIN } from "../config";
import { createDimension } from "../types/dimension";
import { createCourse } from "../types/course";
import { Chart, createStubChart } from "../types/chart";

// Users can select 2-3 charts from the same course on the Charts Dashboard and compare their responses over time.
const CompareCharts: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);
  const [courseName, setCourseName] = useState<string | undefined>(undefined);
  const params = QueryString.parse(props.location.search);

  const chartsToCompareIDs = window.history.state?.state?.chartIDs;
  const [chartsToCompare, setCharts] = useState<Chart[]>([]);

  // If user is not logged in, redirect to Login page
  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }
  }, [cookies]);

  // Fetches data from backend on component mounting
  useEffect(() => {
    fetchCharts();
  }, [chartsToCompareIDs, cookies, params.courseID]);

  // Fetches the course name and the charts to be compared from the backend
  const fetchCharts = async (): Promise<void> => {
    // Gets the course name
    await fetch(`${API_DOMAIN}course/${params.courseID}`, {
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

    let chartsArray: Chart[] = [];

    if (chartsToCompareIDs === undefined) {
      props.history.push("/Dashboard");
      return;
    }
    // Gets the charts from the backend
    await Promise.all(
      Object.keys(chartsToCompareIDs).map(async (key: string) => {
        const chartData = await fetch(
          `${API_DOMAIN}chart/${chartsToCompareIDs[key]}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${cookies["accessToken"]}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const chart = await chartData.json();

        // Get dimensions for the specified chart
        const dimensionData = await fetch(
          `${API_DOMAIN}dimensions/forchart/${chartsToCompareIDs[key]}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${cookies["accessToken"]}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const dimensions = await dimensionData.json();
        const finalChart: Chart = {
          ...createStubChart(chart),
          dimensions: dimensions.map((dimension: any) => {
            return createDimension(dimension);
          }),
        };
        chartsArray.push(finalChart);
      })
    );
    setCharts(chartsArray);
  };

  const onBackClick = () => {
    props.history.push(`/Course/${params.courseID}`);
  };

  return (
    <>
      {chartsToCompare && chartsToCompare.length > 0 ? (
        <div className="Charts-Compare-Container">
          <Header />
          <div className="Charts-Compare-Content">
            <Typography className="Preview-Title">{courseName}</Typography>
            <Col className="Charts-Compare-Row">
              {chartsToCompare[0].dimensions.map((item, index) => {
                if (
                  chartsToCompare.some((chart) => {
                    return chart.dimensions[index].userSelectedSliderPos !== -1;
                  })
                ) {
                  return (
                    <DimensionComparator
                      {...{
                        dimensions: chartsToCompare
                          .filter(
                            (chart) =>
                              chart.dimensions[index].userSelectedSliderPos !==
                              -1
                          )
                          .map((chart) => chart.dimensions[index]),
                        dates: chartsToCompare
                          .filter(
                            (chart) =>
                              chart.dimensions[index].userSelectedSliderPos !==
                              -1
                          )
                          .map((chart) => chart.createdAt),
                        isPreview: true,
                        key: item.name,
                      }}
                    />
                  );
                }
                return undefined;
              })}
            </Col>
          </div>
          <div className="Footer">
            <Button
              type="primary"
              className="Footer-Button"
              onClick={onBackClick}
            >
              Back
            </Button>
          </div>
        </div>
      ) : (
        <div className="DisplayCards">
          <Header />
          <div className="Loading-Spinner">
            <Spin size="large" />
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(CompareCharts);
