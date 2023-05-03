import mongoose from "mongoose";

const activityHistorySchema = new mongoose.Schema({
  idActivity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "activity",
    required: true,
  },
  createdAt: { type: Date, required: true, default: Date.now() },
});

const ActivityHistoryModel = mongoose.model(
  "activityHistory",
  activityHistorySchema
);

export default ActivityHistoryModel;
