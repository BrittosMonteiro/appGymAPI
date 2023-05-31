import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  idGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group",
  },
  isDeleted: { type: Boolean, required: true, default: false },
});

const ExerciseModel = mongoose.model("exercise", exerciseSchema);

export default ExerciseModel;
