import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isDeleted: { type: Boolean, required: true, default: false },
});

const GroupModel = mongoose.model("group", groupSchema);

export default GroupModel;
