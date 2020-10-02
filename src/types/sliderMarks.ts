export type SliderMarks = {
  [key: number]:
    | React.ReactNode
    | {
        style: React.CSSProperties;
        label: React.ReactNode;
        id: string;
      };
};

export const createSliderMarks = (marks: any[]) => {
  const result: SliderMarks = {};
  marks.forEach((mark) => {
    result[mark.position] = {
      style: "#212121",
      label: mark.label,
      id: mark._id,
    };
  });
  return result;
};
