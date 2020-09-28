import { SliderMarks } from "./sliderMarks";
import { Card } from "./card";

export type Dimension = {
  // id: string;
  // chartID: string;
  name: string;
  type: string;
  leftCard: Card;
  rightCard: Card;
  marks?: SliderMarks;
  position: number;
  note?: string;
}