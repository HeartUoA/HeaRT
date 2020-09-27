import { Schema, model } from "mongoose";

const dimensionSchemaDef = {
  chartID: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    default: -1,
  },
  definition: {
    type: String,
    required: true,
  },
  leftCardStatement: {
    type: String,
    required: true,
  },
  rightCardStatement: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
};

const dimensionSchema = new Schema(dimensionSchemaDef);

export default model("Dimension", dimensionSchema);
