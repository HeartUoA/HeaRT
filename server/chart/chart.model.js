import { Schema, model } from "mongoose";

const chartSchemaDef = {
  courseID: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  isComplete: {
    type: Boolean,
    required: true,
    default: false,
  },
  reasonOfPlay: {
    type: String,
    required: false,
  },
  createdByUserID: {
    type: String,
    required: true,
    unique: false,
  },
};

const chartSchema = new Schema(chartSchemaDef);

export default model("Chart", chartSchema);
