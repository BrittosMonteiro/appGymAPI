import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  idGym: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  status: { type: Boolean, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false },
  isIncluded: { type: Array, required: true },
  notIncluded: { type: Array, required: true },
  validMonths: { type: Number, required: false },
});

const PlanModel = mongoose.model("plan", planSchema);

export default PlanModel;
