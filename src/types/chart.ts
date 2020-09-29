import { Dimension } from "./dimension";

export type Chart = {
  id: string;
  courseID: string;
  createdAt: Date;
  dimensions: Dimension[]
};