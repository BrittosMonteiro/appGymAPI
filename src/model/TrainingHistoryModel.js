import mongoose from "mongoose";

const trainingHistorySchema = new mongoose.Schema({
  idActivity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "activity",
    required: true,
  },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: Date, required: true, default: Date.now() },
});

const TrainingHistoryModel = mongoose.model(
  "trainingHistory",
  trainingHistorySchema
);

export default TrainingHistoryModel;
