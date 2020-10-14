import React from "react";
import "../styles/PrintCards.css";
import "../styles/Footer.css";
import { Dimension as DimensionType } from "../types/dimension";

import { Slider } from "antd";

import "../styles/PrintDimension.css";

const PRACTICE_BG_COLOUR = "#ffc4d3";
const BELIEF_BG_COLOUR = "#c4ddff";

interface PrintFullDimensionCardsProps {
  passAllDimensions: DimensionType[];
}

interface PrintDimensionProps {
  dimensionValue: number;
  secondStatement: boolean;
  allDimensions: DimensionType;
}

// A class was used here as the team followed the NPM library format on how to use refs
class PrintDimensionCards extends React.Component<
  PrintFullDimensionCardsProps
> {
  render() {
    const allDimensions =
      this.props.passAllDimensions && this.props.passAllDimensions;
    return (
      <div>
        {allDimensions.map((currElement: any, index: number) => (
          <>
            <div
              className="PrintingCards"
              style={
                allDimensions[index].type === "Practice"
                  ? { backgroundColor: PRACTICE_BG_COLOUR }
                  : { backgroundColor: BELIEF_BG_COLOUR }
              }
            >
              <span className="Print-Card-Text-TopLeft">{index + 1}</span>
              <span className="Print-Card-Text">
                {index % 2
                  ? allDimensions[index].rightCard.statement
                  : allDimensions[index].leftCard.statement}
              </span>
            </div>
            <div className="PrintingCards">
              <PrintDimension
                dimensionValue={index}
                secondStatement={false}
                allDimensions={allDimensions[index]}
              />
            </div>
            <div
              className="PrintingCards"
              style={
                allDimensions && allDimensions[index].type === "Practice"
                  ? { backgroundColor: PRACTICE_BG_COLOUR }
                  : { backgroundColor: BELIEF_BG_COLOUR }
              }
            >
              <span className="Print-Card-Text-TopLeft">{index + 1}</span>
              <span className="Print-Card-Text">
                {index % 2
                  ? allDimensions[index].leftCard.statement
                  : allDimensions[index].rightCard.statement}
              </span>
            </div>
            <div className="PrintingCards">
              <PrintDimension
                dimensionValue={index}
                secondStatement={true}
                allDimensions={allDimensions[index]}
              />
            </div>
          </>
        ))}
      </div>
    );
  }
}

const PrintDimension: React.FC<React.PropsWithChildren<PrintDimensionProps>> = (
  props
) => {
  const initDimensionProps = props.allDimensions;

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

export default PrintDimensionCards;
