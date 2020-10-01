export type SliderMarks = {
  // id: string;
  // dimensionID: string;
  [key: number]:
    | React.ReactNode
    | {
        style: React.CSSProperties;
        label: React.ReactNode;
      };
};
