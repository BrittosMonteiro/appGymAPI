import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
  idGym: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  name: { type: String, required: true },
  birthdate: { type: Date, required: false },
  phone: { type: String, required: false },
  email: { type: String, required: true },
  cref: { type: String, required: false },
  password: { type: String, required: true },
});

const InstructorModel = mongoose.model("instructor", instructorSchema);

export default InstructorModel;
