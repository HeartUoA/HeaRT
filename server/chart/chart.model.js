import { Schema, model, Mongoose } from "mongoose";

const chartSchema = Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  // This field is to be updated upon implementation of permissions
  permissions: {
    type: String,
    required: false,
  },
  tags: [
    {
      type: String,
      required: false,
    },
  ],
  dimensions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dimension",
      required: true,
    },
  ],
});
const dimensionSchema = Schema({
  // Unsure if needed
  // dimensionType: {
  //     type: String,
  //     required: true
  // },

  definition: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: false,
  },

  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
      required: true,
    },
  ],
  note: {
    type: String,
    required: false,
  },
});

const cardSchema = Schema({
  statement: {
    type: String,
    required: true,
  },
  // 0 - card is placed on the left, 1 - card is placed on the right
  placement: { type: Boolean, required: true },
});
const Dimension = mongoose.model("Dimension", dimensionSchema);
const Card = mongoose.model("Card", cardSchema);

export default model("User", chartSchema);
