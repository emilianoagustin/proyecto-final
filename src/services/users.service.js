import * as Model from "../models/Users.js";

export async function registerUser(email, passwordHash) {
  return await Model.registerUser(email, passwordHash);
}
