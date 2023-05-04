import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now(), required: true },
  items: { type: Array, required: true },
  title: { type: String, required: true },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

const TrainingModel = mongoose.model("training", trainingSchema);

export default TrainingModel;
