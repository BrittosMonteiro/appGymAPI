import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  value: { type: Number, required: true },
  year: { type: Number, default: new Date().getFullYear() },
  createdAt: { type: Date, required: true, default: Date.now() },
});

const GoalModel = mongoose.model("goal", goalSchema);

export default GoalModel;
