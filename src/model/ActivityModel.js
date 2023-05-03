import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now(), required: true },
  items: { type: Array, required: true },
  title: { type: String, required: true },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

const ActivityModal = mongoose.model("activity", activitySchema);

export default ActivityModal;
