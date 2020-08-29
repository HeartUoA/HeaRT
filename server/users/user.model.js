import { Schema, model } from 'mongoose';

const userSchemaDef = {
  name: {
    type: String,
    unique: true,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
};

const userSchema = new Schema(userSchemaDef);

export default model('User', userSchema);
