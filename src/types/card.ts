export interface Card {
  statement: string;
  anchorSliderPos: number;
  isEditing: boolean;
}

export const createCard = (cardStatement: string, cardAnchor: number) => {
  const result: Card = {
    statement: cardStatement,
    anchorSliderPos: cardAnchor,
    isEditing: false,
  };
  return result;
};
