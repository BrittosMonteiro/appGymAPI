import UserModel from "../model/UserModel.js";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function createAccountController(req, res) {
  const data = req.body;
  data.password = bcryptjs.hashSync(data.password, 14);

  await new UserModel(data)
    .save()
    .then((responseCreate) => {
      if (responseCreate) {
        const response = {
          id: responseCreate._id.toString(),
          idGym: responseCreate.idGym,
          displayName:
            responseCreate.shortName || responseCreate.name.split(" ")[0],
          email: responseCreate.email,
          username: responseCreate.username,
          userLevel: responseCreate.userLevel,
        };

        const token = jwt.sign(response, process.env.TOKEN_SECRET);

        res.header("authorization-token", token);
        return res.status(201).json({
          data: {
            id: response.id,
            idGym: response.idGym,
            displayName: response.displayName,
            userLevel: response.userLevel,
            token,
          },
        });
      } else {
        console.log("aqui1");
        return res.json({ message: "User could not be created" });
      }
    })
    .catch((err) => {
      console.log(err.message);
      return res.json({
        message: "Serviço indisponível no momento. Tente mais tarde",
      });
    });
}

export async function loginController(req, res) {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username }).populate({
      path: "idGym",
    });
    if (!user) {
      return res.status(400).send("Usuário/senha incorretos");
    }

    const comparePass = bcryptjs.compareSync(password, user.password);
    if (!comparePass) {
      return res.status(400).send("Usuário/senha incorretos");
    }

    const response = {
      id: user._id.toString(),
      idGym: user.idGym && user.idGym._id.toString(),
      displayName: user.shortName || user.name.split(" ")[0],
      email: user.email,
      username: user.username,
      userLevel: user.userLevel,
      hasPlan: user.idGym && true,
      planValidDate: user.planValidDate && user.planValidDate,
    };

    const token = jwt.sign(response, process.env.TOKEN_SECRET);

    res.header("authorization-token", token);
    res.status(200);
    res.json({
      id: response.id,
      displayName: response.displayName,
      hasPlan: response.idGym && true,
      idGym: response.idGym,
      planValidDate: response.planValidDate,
      token,
      userLevel: response.userLevel,
    });
    return res;
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}
