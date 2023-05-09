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

  await UserModel.findOne({ username })
    .populate({ path: "idGym" })
    .then((responseFind) => {
      if (responseFind) {
        const comparePassword = bcryptjs.compareSync(
          password,
          responseFind.password
        );
        if (!comparePassword) {
          return res.status(400).send("Usuário/senha incorretos");
        }

        const data = {
          id: responseFind._id.toString(),
          idGym: responseFind.idGym && responseFind.idGym._id.toString(),
          displayName: responseFind.shortName || responseFind.name.split(" ")[0],
          email: responseFind.email,
          username: responseFind.username,
          userLevel: responseFind.userLevel,
          hasPlan: responseFind.idGym && true,
          planValidDate: responseFind.planValidDate && responseFind.planValidDate,
        };
        const token = jwt.sign(data, process.env.TOKEN_SECRET);

        res.header("authorization-token", token);
        res.status(200);
        res.json({
          id: data.id,
          displayName: data.displayName,
          hasPlan: data.idGym && true,
          idGym: data.idGym,
          planValidDate: data.planValidDate,
          token,
          userLevel: data.userLevel,
        });
        return res;
      } else {
        return res.json({ message: "User could not be found" });
      }
    })
    .catch((err) => {
      console.log(err)
      return res.json({ message: "Service unavailable" });
    });
}
