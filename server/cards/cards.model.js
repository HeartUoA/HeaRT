import { Schema, model } from "mongoose";

const cardsSchemaDef = {
  //Dimension identifier
  Dimension: {
    type: Number,
    unique: true,
    required: true,
  },
  //Dimension Text
  Statement: {
    type: String,
    required: true,
  },
  //Position where the slider will be located
  Position: {
    type: Number,
    required: true,
  },
};

const cardSchema = new Schema(cardsSchemaDef);

export default model("Cards", cardSchema);
