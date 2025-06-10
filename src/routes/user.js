import express from "express";

import { INSERT_USER, ALL_USERS, LOGIN_USER } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/", INSERT_USER);
userRouter.get("/", ALL_USERS);
userRouter.post("/login", LOGIN_USER);

export default userRouter;
