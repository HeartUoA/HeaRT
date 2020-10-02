export type SliderMarks = {
  [key: number]:
    | React.ReactNode
    | {
        style: React.CSSProperties;
        label: React.ReactNode;
        id: string;
      };
};

export type BackendMarks = {
  _id: string;
  position: number;
  label: string;
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

export const createBackendSliderMarks = (marks: SliderMarks) => {
  const result: BackendMarks[] = [];

  for (const key of Object.keys(marks)) {
    const position = !!Number(key) & Number(key);
    result.push({
      _id: marks[position].id,
      position: key,
      label: value.label,
    });
  }
  return result;
};
