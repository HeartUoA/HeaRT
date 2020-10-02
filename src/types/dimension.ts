import { SliderMarks, createSliderMarks } from "./sliderMarks";
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
    userExplanation: undefined, // TODO: Change this to (dimension.note or undefined). Does the backend return a note variable? Could not find it
  };
  return result;
};
