import { Schema, model } from "mongoose";

const chartSchemaDef = {
  courseID: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
};

const chartSchema = new Schema(chartSchemaDef);

export default model("Chart", chartSchema);
