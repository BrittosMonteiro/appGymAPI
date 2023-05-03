import bcryptjs from "bcryptjs";
import UserModel from "../model/UserModel.js";

export async function createInstructorController(req, res) {
  let data = req.body;
  data.password = bcryptjs.hashSync("teste123", 14);

  await new UserModel(data)
    .save()
    .then((responseCreate) => {
      if (responseCreate) {
        return res.status(201).json({ message: "Instructor created" });
      } else {
        return res
          .status(200)
          .json({ message: "Instructor could not be created" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}

export async function readInstructorListController(req, res) {
  const { idGym } = req.params;

  await UserModel.find({ idGym, userLevel: 2 })
    .then((responseFind) => {
      if (responseFind) {
        return res.json({ data: responseFind });
      } else {
        return res.json({ message: "Instructor could not be found" });
      }
    })
    .catch(() => {
      return res.json({ message: "Service unavailable" });
    });
}

export async function readInstructorByIdController(req, res) {
  const { idInstructor } = req.params;

  await UserModel.findById(idInstructor)
    .populate({ path: "idGym" })
    .then((responseFind) => {
      if (responseFind) {
        const data = {
          name: responseFind.name,
          email: responseFind.email,
          birthdate: responseFind.birthdate,
          cref: responseFind.cref,
          gym: responseFind.idGym.name,
        };
        return res.status(200).json({ data });
      } else {
        return res.json({ message: "Instructor could not be found" });
      }
    })
    .catch(() => {
      return res.json({ message: "Service unavailable" });
    });
}

export async function updateInstructorController(req, res) {
  const { idInstructor, data } = req.body;

  await UserModel.findByIdAndUpdate(idInstructor, data)
    .then((responseCreate) => {
      if (responseCreate) {
        return res.status(200).json({ message: "Instructor upated" });
      } else {
        return res
          .status(200)
          .json({ message: "Instructor could not be updated" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}

export async function deleteInstructorController(req, res) {
  const { idInstructor } = req.body;

  await UserModel.findByIdAndDelete(idInstructor)
    .then((responseDelete) => {
      if (responseDelete) {
        return res.json({ message: "Instructor deleted" });
      } else {
        return res.json({ message: "Instructor could not be deleted" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}
