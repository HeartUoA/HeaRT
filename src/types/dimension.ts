import {
  SliderMarks,
  createSliderMarks,
  createBackendSliderMarks,
} from "./sliderMarks";
import { Card, createCard } from "./card";

export type Dimension = {
  id: string;
  chartID: string;
  name: string;
  type: string;
  leftCard: Card;
  rightCard: Card;
  marks?: SliderMarks;
  userSelectedSliderPos: number;
  userExplanation?: string;
};

export const createDimension = (dimension: any) => {
  const result: Dimension = {
    id: dimension._id,
    chartID: dimension.chartID,
    name: dimension.definition,
    type: dimension.type,
    leftCard: createCard(
      dimension.leftCardStatement,
      dimension.leftCardDefaultSliderPosition
    ),
    rightCard: createCard(
      dimension.rightCardStatement,
      dimension.rightCardDefaultSliderPosition
    ),
    marks: createSliderMarks(dimension.marks),
    userSelectedSliderPos: dimension.score,
    userExplanation: dimension.note ? dimension.note : undefined,
  };
  return result;
};

export const createBackendDimension = (dimension: Dimension) => {
  const result: any = {
    chartID: dimension.chartID,
    type: dimension.type,
    score: dimension.userSelectedSliderPos,
    definition: dimension.name,
    leftCardStatement: dimension.leftCard.statement,
    rightCardStatement: dimension.rightCard.statement,
    leftCardDefaultSliderPosition: dimension.leftCard.anchorSliderPos,
    rightCardDefaultSliderPosition: dimension.rightCard.anchorSliderPos,
    marks: dimension.marks
      ? createBackendSliderMarks(dimension.marks)
      : undefined,
    note: dimension.userExplanation ? dimension.userExplanation : undefined,
  };
  return result;
};
