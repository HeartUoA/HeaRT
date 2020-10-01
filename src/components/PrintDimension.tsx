import { Slider, Switch } from "antd";
import React, { useEffect, useRef, useState } from "react";
import "../styles/PrintDimension.css";
import charts from "../dummyData/charts";

import { API_DOMAIN } from "../config";

interface PrintDimensionProps {
  dimensionVallue: number;
}
const chartID = "";

const PrintDimension: React.FC<React.PropsWithChildren<PrintDimensionProps>> = (
  props
) => {
  useEffect(() => {
    fetch(`${API_DOMAIN}dimensions/forchart/${chartID}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        //Get data and set it to Dimensions
      })
      .catch((e) => console.log(e));
  }, []);

  const allDimensions = charts[0].dimensions;
  const something = allDimensions[props.dimensionVallue];

  return (
    <>
      <span className="printDimensionText">Pedagogical Dimension:</span>
      <span className="printTitleText">
        {allDimensions[props.dimensionVallue].name}
      </span>
      <span className="printContinuumText">Continuum:</span>
      <Slider
        className="printSlider"
        range
        defaultValue={[0, 100]}
        disabled={true}
        marks={allDimensions[props.dimensionVallue].marks}
      />
      <span className="printStatementText">
        Statement reflects '{something.marks && something.marks[100]}' purpose
      </span>
    </>
  );
};

export default PrintDimension;
