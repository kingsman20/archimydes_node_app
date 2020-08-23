import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

interface DataStoredInToken {
  id: number;
  email: string;
  role: string;
}

async function authMiddleware(req, res, next) {
  //Get the jwt token from the head
  const token = req.headers["x-access-token"] as string;

  if (token) {
    try {
      const verifyToken = jwt.verify(
        token,
        process.env.JWT_SECRET
      ) as DataStoredInToken;

      req.user = verifyToken;

      next();
    } catch (error) {
      return res.status(400).send({ message: "Invalid token provided" });
    }
  } else {
    return res.status(400).send({ message: "No token provided" });
  }
}

export default authMiddleware;
