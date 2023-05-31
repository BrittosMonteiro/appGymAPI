import mongoose from "mongoose";

const workoutHistorySchema = new mongoose.Schema({
  idActivity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workout",
    required: true,
  },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  weekNumber: { type: Number, required: true },
  createdAt: { type: Date, required: true },
});

const WorkoutHistoryModel = mongoose.model(
  "workoutHistory",
  workoutHistorySchema
);

export default WorkoutHistoryModel;
