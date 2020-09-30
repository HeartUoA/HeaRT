import { Schema, model } from "mongoose";

const courseSchemaDef = {
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  cohortSize: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  startYear: {
    type: Number,
    required: Date,
  },
  createdByUserID: {
    type: String,
    required: true,
  },
};

const courseSchema = new Schema(courseSchemaDef);

export default model("Course", courseSchema);
