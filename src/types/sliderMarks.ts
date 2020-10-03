export type SliderMarks = {
  [key: number]: {
    style: React.CSSProperties;
    label: string;
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
      style: { color: "#212121" },
      label: mark.label,
      id: mark._id,
    };
  });
  return result;
};

export const createBackendSliderMarks = (marks: SliderMarks) => {
  const result: BackendMarks[] = [];
  for (const key of Object.keys(marks)) {
    const position = Number(key);
    if (position !== undefined && position !== null) {
      let object: BackendMarks;
      if (typeof marks[position] === "object") {
        object = {
          _id: marks[position].id,
          position: position,
          label: marks[position].label,
        };
        result.push(object);
      }
    }
  }
  return result;
};
