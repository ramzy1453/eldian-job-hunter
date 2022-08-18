import { Router } from "express";
import { getAllUsers, login, register, updateUser } from "../controllers/auth";
import authMiddleware from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.route("/login").post(login).patch([authMiddleware], updateUser);
authRouter.route("/register").post(register);
authRouter.route("/users").get(getAllUsers);

export default authRouter;
