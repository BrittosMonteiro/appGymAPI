import mongoose from "mongoose";

const trainingHistorySchema = new mongoose.Schema({
  idActivity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "activity",
    required: true,
  },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  weekNumber: { type: Number, required: true },
  createdAt: { type: Date, required: true },
});

const TrainingHistoryModel = mongoose.model(
  "trainingHistory",
  trainingHistorySchema
);

export default TrainingHistoryModel;
