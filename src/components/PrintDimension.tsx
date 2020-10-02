import { Slider } from "antd";
import React, { useEffect } from "react";
import "../styles/PrintDimension.css";
import charts from "../dummyData/charts";

import { API_DOMAIN } from "../config";

interface PrintDimensionProps {
  dimensionValue: number;
  SecondStatement: boolean;
}

const PrintDimension: React.FC<React.PropsWithChildren<PrintDimensionProps>> = (
  props
) => {
  useEffect(() => {
    fetch(`${API_DOMAIN}dimensions/forchart/${""}`, {
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
  const initDimensionProps = allDimensions[props.dimensionValue];

  const pinpoint =
    props.SecondStatement !== true
      ? allDimensions[props.dimensionValue].leftCard.anchorSliderPos
      : allDimensions[props.dimensionValue].rightCard.anchorSliderPos;

  return (
    <>
      <span className="printDimensionText">
        Pedagogical Dimension:
        <span className="TypeofDimension">
          [{allDimensions[props.dimensionValue].type}]
        </span>
      </span>
      <span className="printTitleText">
        {allDimensions[props.dimensionValue].name}
      </span>
      <span className="printContinuumText">Continuum:</span>
      <Slider
        className="printSlider"
        value={pinpoint}
        dots={false}
        tooltipVisible={false}
        included={false}
        marks={allDimensions[props.dimensionValue].marks}
      />
      <span className="printStatementText">
        Statement reflects '
        <span className="StatementReflection">
          {initDimensionProps.marks && initDimensionProps.marks[pinpoint]}
        </span>
        ' purpose
      </span>
    </>
  );
};

export default PrintDimension;
