import UserModel from "../model/UserModel.js";

export async function verifyEmail(data) {
  const verify = await UserModel.find({ email: data.email });
  if (verify.length > 0) {
    return "lbl_email_already_registered";
  }

  return null;
}

export async function verifyUsername(data) {
  const verify = await UserModel.find({ username: data.username });
  if (verify.length > 0) {
    return "lbl_user_already_registered";
  }

  return null;
}

export function verifyCnpjOrCrefOrCpf(data) {
  switch (data.userLevel) {
    case 1:
      return verifyData({ cnpj: data.cnpj });
    case 2:
      return verifyData({ cref: data.cref });
    case 3:
      return verifyData({ cpf: data.cpf });
    default:
      return;
  }
}

async function verifyData(data) {
  const verify = await UserModel.find(data);
  if (verify.length > 0) {
    return "lbl_cpf_already_registered";
  }

  return null;
}
