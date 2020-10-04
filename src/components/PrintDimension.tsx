import { Slider } from "antd";
import React from "react";
import "../styles/PrintDimension.css";

import { Dimension as DimensionType } from "../types/dimension";

interface PrintDimensionProps {
  dimensionValue: number;
  secondStatement: boolean;
  allDimensions: DimensionType;
}

const PrintDimension: React.FC<React.PropsWithChildren<PrintDimensionProps>> = (
  props
) => {
  // const allDimensions = charts[0].dimensions;
  const initDimensionProps = props.allDimensions;
  console.log(props.allDimensions.marks + "PRINTCARDS");
  const pinpoint =
    props.secondStatement !== true
      ? props.allDimensions.leftCard.anchorSliderPos
      : props.allDimensions.rightCard.anchorSliderPos;

  return (
    <>
      <span className="printDimensionText">
        Pedagogical Dimension:
        <span className="TypeofDimension">[{props.allDimensions.type}]</span>
      </span>
      <span className="printTitleText">{props.allDimensions.name}</span>
      <span className="printContinuumText">Continuum:</span>
      <Slider
        className="printSlider"
        value={pinpoint}
        dots={false}
        tooltipVisible={false}
        included={false}
        marks={props.allDimensions.marks}
      />
      <span className="printStatementText">
        Statement reflects '
        <span className="StatementReflection">
          {initDimensionProps.marks && initDimensionProps.marks[pinpoint].label}
        </span>
        ' purpose
      </span>
    </>
  );
};

export default PrintDimension;
