export const DEFAULT_COLOURS = {
  leftCardColour: "#FFFFFF",
  rightCardColour: "#FFFFFF",
};

/* Function to calculate the background colours for display cards depending on the slider position
 * value - Slider position (from 0 to 100)
 * dimesionType - The type of the dimension (Practice or Belief) as this decides whether the card has a blue or pink hue
 */
export const getColours = (value: number, dimensionType: string) => {
  const hue = dimensionType === "Practice" ? 344.7 : 215.7;
  const leftValue = 87 + (13 / 100) * value;
  const leftColour = ["hsl(", hue, ",100%,", leftValue, "%)"].join("");

  const rightValue = 100 - (13 / 100) * value;
  const rightColour = ["hsl(", hue, ",100%,", rightValue, "%)"].join("");

  return {
    leftCardColour: leftColour,
    rightCardColour: rightColour,
  };
};
