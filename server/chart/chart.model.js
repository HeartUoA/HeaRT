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
  reasonOfPlay: {
    type: String,
    required: true,
  },
};

const chartSchema = new Schema(chartSchemaDef);

export default model("Chart", chartSchema);
