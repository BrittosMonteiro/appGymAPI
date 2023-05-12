import UserModel from "../model/UserModel.js";

import bcryptjs from "bcryptjs";

export async function createGymUserController(req, res) {
  let data = req.body;
  data.password = bcryptjs.hashSync("teste123", 14);
  data.username = `${data.name.split(" ")[0].toLowerCase()}_${
    data.email.split("@")[0]
  }`;
  data.userLevel = 3;

  await new UserModel(data)
    .save()
    .then((responseCreate) => {
      if (responseCreate) {
        return res.status(201).json({ message: "User created" });
      } else {
        return res.json({ message: "User could not be created" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}

export async function readGymUsersListController(req, res) {
  const { idGym } = req.params;

  await UserModel.find({ idGym, userLevel: 3 })
    .sort({ name: "asc" })
    .then((responseFind) => {
      if (responseFind) {
        let userList = [];
        for (let user of responseFind) {
          userList.push({
            name: user.name.toUpperCase(),
            idUser: user._id.toString(),
          });
        }
        return res.status(200).json({ data: userList });
      } else {
        return res.json({ message: "User list could not be found" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}

export async function readUserById(req, res) {
  const { idUser } = req.params;

  await UserModel.findById(idUser)
    .populate({ path: "idGym" })
    .populate({ path: "idPlan" })
    .then((responseFind) => {
      if (responseFind) {
        const user = {
          name: responseFind.name,
          birthdate: responseFind.birthdate,
          email: responseFind.email,
          username: responseFind.username,
          cpf: responseFind.cpf,
          gym: responseFind.idGym?.name || null,
          plan: responseFind.idPlan || null,
          cnpj: responseFind.cnpj,
          shortName: responseFind.shortName,
          cref: responseFind.cref,
          planValidDate: responseFind.planValidDate || null,
        };
        return res.status(200).json({ data: user });
      } else {
        return res.json({ message: "User could not be found" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}

export async function readUsersNotAttachedToGymController(req, res) {
  await UserModel.find({
    userLevel: 3,
    $or: [{ idGym: undefined }, { idGym: null }],
  })
    .sort({ name: "asc" })
    .then((responseFind) => {
      if (responseFind) {
        let usersList = [];
        for (let response of responseFind) {
          const user = {
            name: response.name.toLowerCase(),
            idUser: response._id.toString(),
          };
          usersList.push(user);
        }
        return res.status(200).json({ data: usersList });
      } else {
        return res.json({ message: "Users could not be found" });
      }
    })
    .catch(() => {
      return res.json({ message: "Service unavailable" });
    });
}

export async function setPlanToUserController(req, res) {
  const data = req.body;

  await UserModel.findByIdAndUpdate(data.idUser, {
    idPlan: data.idPlan,
    idGym: data.idGym,
    planValidDate: data.planValidDate,
  })
    .then((responseUpdate) => {
      if (responseUpdate) {
        return res.status(200).json({ message: "Plan set to user" });
      } else {
        return res.json({ message: "Plan could not be set to user" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}

export async function removePlantFromUserController(req, res) {
  const { idUser } = req.body;

  await UserModel.findByIdAndUpdate(idUser, {
    idGym: null,
    idPlan: null,
    planValidDate: null,
  })
    .then((responseUpdate) => {
      if (responseUpdate) {
        return res.status(200).json({ message: "Plan removed" });
      } else {
        return res.status(200).json({ message: "Plan could not be removed" });
      }
    })
    .catch((err) => {
      return res.status(200).json({ message: "Service unavailable" });
    });
}

export async function updatePasswordController(req, res) {
  const { idUser, password } = req.body;
  const encryptedPassword = bcryptjs.hashSync(password, 14);

  await UserModel.findByIdAndUpdate(idUser, { password: encryptedPassword })
    .then((responseUpdate) => {
      if (responseUpdate) {
        return res.json({ message: "Password updated" });
      } else {
        return res.json({ message: "Password could not be updated" });
      }
    })
    .catch((err) => {
      return res.json({
        message: "Service unavailable. Please, try again in a few moments",
      });
    });
}

export async function updateUserService(req, res) {
  const { idUser, updateData } = req.body;

  await UserModel.findByIdAndUpdate(idUser, updateData)
    .then((responseUpdate) => {
      if (responseUpdate) {
        return res.status(200).json({ message: "User updated" });
      } else {
        return res.status(200).json({ message: "User could not be updated" });
      }
    })
    .catch((err) => {
      return res.status(200).json({ message: "Service unavailable" });
    });
}

export async function deleteUserAccountController(req, res) {
  const { idUser } = req.body;

  await UserModel.findByIdAndDelete(idUser)
    .then((responseDelete) => {
      if (responseDelete) {
        return res.status(200).json({ message: "User account deleted" });
      } else {
        return res.json({ message: "User account could not be deleted" });
      }
    })
    .catch((err) => {
      return res.json({ message: "Service unavailable" });
    });
}
