import bcrypt from "bcrypt";
import * as UserService from "../services/users.service.js";
import { findUserByEmail } from "../models/Users.js";

export async function register(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(422)
      .json({ success: false, message: "Email or password are missing" });

  const existingUser = await findUserByEmail(email);

  if (existingUser)
    return res
      .status(409)
      .json({ success: false, message: "user already exists" });

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await UserService.registerUser(email, passwordHash);

  if (!user) return res.sendStatus(503);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: { id: user.id, email: user.email },
  });
}
export function login(req, res) {
  res.json({ message: "message from login" });
}
