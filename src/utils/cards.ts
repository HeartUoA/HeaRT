export const DEFAULT_COLOURS = {
  leftCardColour: "#FFFFFF",
  rightCardColour: "#FFFFFF",
};

export const getColours = (value: number) => {
  const hue = 344.7;
  const leftValue = 87 + (13 / 100) * value;
  const leftColour = ["hsl(", hue, ",100%,", leftValue, "%)"].join("");

  const rightValue = 100 - (13 / 100) * value;
  const rightColour = ["hsl(", hue, ",100%,", rightValue, "%)"].join("");

  return {
    leftCardColour: leftColour,
    rightCardColour: rightColour,
  };
};
