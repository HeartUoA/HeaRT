import { Slider, Switch } from "antd";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { RouteComponentProps } from "react-router-dom";
import "../styles/PrintDimension.css";
import charts from "../dummyData/charts";

interface PrintDimensionProps {
  dimensionVallue: number;
}

const PrintDimension: React.FC<React.PropsWithChildren<PrintDimensionProps>> = (
  props
) => {
  const allDimensions = charts[0].dimensions;
  const low = 0;
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
      {/* Below isn't added in the backend */}
      <span className="printStatementText">
        Statement reflects 'Academic/abstract'{} purpose
      </span>
    </>
  );
};

export default PrintDimension;
