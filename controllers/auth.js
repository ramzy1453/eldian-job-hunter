import { StatusCodes } from "http-status-codes";
import { BadRequestErrorAPI, UnauthorizedErrorAPI } from "../errors/errorAPI";
import User from "../models/user";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new BadRequestErrorAPI("Please provide all values!");
  }
  if (await User.findOne({ email })) {
    throw new BadRequestErrorAPI("Email already used");
  }

  const user = await User.create({ username, email, password });
  user.password = undefined;
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    succes: true,
    user,
    token,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestErrorAPI("Please provide all values");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestErrorAPI("Invalid Email !");
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new UnauthorizedErrorAPI("Invalid Password !");
  }

  // All good
  user.password = undefined;
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ logged: true, user, token });
};

export const updateUser = async (req, res) => {
  const { userID } = req.user;
  const { username, email, aboutme, image } = req.body;

  if (await User.findOne({ email, _id: { $ne: userID } })) {
    throw new BadRequestErrorAPI("Email already used");
  }

  const user = await User.findOne({ _id: userID });
  user.email = email || user.email;
  user.username = username || user.username;
  user.aboutme = aboutme || user.aboutme;
  user.image = image || user.image;

  await user.save();
  // Re creation of token is not required, but for a new expiration date

  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({ updated: true, user, token });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find(
    {},
    { username: 1, image: 1, aboutme: 1, location: 1, email: 1 }
  );
  res.status(StatusCodes.OK).json({ users });
};
