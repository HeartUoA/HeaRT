export type Card = {
  statement: string;
  anchorSliderPos: number;
  isEditing: boolean;
};

// Used for Display Cards and Preview Dimension
export enum CardSide {
  Left,
  Right,
}

export const createCard = (cardStatement: string, cardAnchor: number) => {
  const result: Card = {
    statement: cardStatement,
    anchorSliderPos: cardAnchor,
    isEditing: false,
  };
  return result;
};
