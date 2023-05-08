import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  idGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group",
  },
  isDeleted: { type: Boolean, required: true, default: false },
});

const ActivityModel = mongoose.model("activity", activitySchema);

export default ActivityModel;
