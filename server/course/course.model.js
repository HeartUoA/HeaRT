import { Schema, model } from "mongoose";

const courseSchemaDef = {
  name: {
    type: String,
    required: true,
    unique: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  cohortSize: {
    type: Number,
    required: true,
    unique: false,
  },
  role: {
    type: String,
    required: true,
    unique: false,
  },
  startYear: {
    type: Date,
    required: true,
    unique: false,
  },
  createdByUserID: {
    type: String,
    required: true,
    unique: false,
  },
};

const courseSchema = new Schema(courseSchemaDef);

export default model("Course", courseSchema);
