import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, trim: true, required: true, unique: true },
  username: { type: String, trim: true, required: true, unique: true },
  password: { type: String, required: true },
  userLevel: { type: Number, required: true },
  shortName: { type: String }, //company
  cnpj: { type: String, required: false }, //company
  cref: { type: String, required: false }, //instructors
  cpf: { type: String, required: false }, //general users
  idGym: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  birthdate: { type: Date, required: false },
  idPlan: { type: mongoose.Schema.Types.ObjectId, ref: "plan" },
  planValidDate: { type: Date, required: false },
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
