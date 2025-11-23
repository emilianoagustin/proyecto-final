import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
      .json({ success: false, message: "User already exists" });

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await UserService.registerUser(email, passwordHash);

  if (!user) return res.sendStatus(503);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: { id: user.id, email: user.email },
  });
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(422)
      .json({ success: false, message: "Email or password are missing" });

  const user = await findUserByEmail(email);

  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "Wrong credentials" });

  const validateUser = await bcrypt.compare(password, user.password);

  if (!validateUser)
    return res
      .status(401)
      .json({ success: false, message: "Wrong credentials" });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return res.json({ token });
}
