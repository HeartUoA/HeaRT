import { Dimension, createDimension } from "./dimension";

export type Chart = {
  id: string;
  createdAt: Date;
  dimensions: Dimension[];
};

export type StubChart = {
  id: string;
  courseID: string;
  createdAt: Date;
  isComplete: boolean;
};

export const createChart = (chart: any) => {
  const result: Chart = {
    id: chart.chartID,
    createdAt: new Date(chart.createdAt),
    dimensions: chart.dimensions.map((dimension: any) => {
      return createDimension(dimension);
    }),
  };
  return result;
};

export const createStubChart = (chart: any) => {
  return {
    ...chart,
    id: chart._id,
    isComplete: chart.isComplete,
    createdAt: new Date(chart.createdAt),
  };
};

export const createBackendChart = (chart: Chart, courseID: string) => {
  const result: any = {
    courseID: courseID,
    createdAt: chart.createdAt,
  };
  return result;
};
