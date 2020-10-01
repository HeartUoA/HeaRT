import { Schema, model } from "mongoose";

const userSchemaDef = {
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  institution: {
    type: String,
    required: true,
    unique: false,
  },
  department: {
    type: String,
    required: true,
    unique: false,
  },
  position: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
    unique: false,
  },
};

const userSchema = new Schema(userSchemaDef);

export default model("User", userSchema);
