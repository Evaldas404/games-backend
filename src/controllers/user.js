import { v4 as uuidv4 } from "uuid";
import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const users = [];

export const INSERT_USER = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const newUser = {
      ...req.body,
      id: uuidv4(),
      createdAt: new Date(),
      password: passwordHash,
    };
    users.push(newUser);

    const response = new UserModel(newUser);
    const data = await response.save();

    res.status(201).json({
      message: "User was created",
      user: data,
    });
  } catch (err) {
    const DUPLICATE_ERROR_CODE = 11000;

    if (err.code === DUPLICATE_ERROR_CODE) {
      res.status(409).json({
        message: "User with this email already exist",
      });
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
};

export const ALL_USERS = async (req, res) => {
  const users = await UserModel.find().select("-password -createdAt -__v");

  res.status(200).json({
    users: users,
  });
};

export const LOGIN_USER = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    res.status(401).json({
      message: "email or password is wrong (email)",
    });
  }
  const matchPassword = bcrypt.compareSync(req.body.password, user.password);

  if (!matchPassword) {
    res.status(401).json({
      message: "email or password is wrong (password)",
    });
  }

  const token = jwt.sign(
    { userEmail: user.email, userId: user.id },
    process.env.JWT_SECRET,
    {
      expiresIn: "12h",
    }
  );

  return res.status(200).json({
    message: "User logged in",
    jwt: token,
  });
};
