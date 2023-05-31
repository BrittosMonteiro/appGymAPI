import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now(), required: true },
  items: { type: Array, required: true },
  title: { type: String, required: true },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  workoutDays: { type: Array, required: true, default: [] },
});

const WorkoutModel = mongoose.model("workout", workoutSchema);

export default WorkoutModel;
