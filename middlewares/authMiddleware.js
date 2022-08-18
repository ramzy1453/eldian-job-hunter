import jwt from "jsonwebtoken";
import "dotenv/config";
import { UnauthorizedErrorAPI } from "../errors/errorAPI";

export default async function authMiddleware(req, res, next) {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    throw new UnauthorizedErrorAPI("Authentication invalid");
  }

  const token = authHeaders.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userID: payload.userID };
  } catch (error) {
    throw new UnauthorizedErrorAPI("Authentication invalid");
  }

  next();
}
