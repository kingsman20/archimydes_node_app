import * as express from "express";
import { getRepository } from "typeorm";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { User } from "./user.entity";
import validationMiddleware from "../middlewares/validation.middleware";
import { RegisterUserDto, LoginUserDto } from "./user.dto";

class UserController {
  public path = "/auth";
  public router = express.Router();
  private usersRepository = getRepository(User);

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(RegisterUserDto),
      this.register
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LoginUserDto),
      this.login
    );
  }

  register = async (request: express.Request, response: express.Response) => {
    const userData: RegisterUserDto = request.body;
    const existingUser = await this.usersRepository.findOne({
      email: userData.email,
    });

    if (existingUser)
      return response.status(409).send({ message: "User already exists!" });

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });
    await this.usersRepository.save(user);
    const tokenData = this.createToken(user);
    user.password = undefined; // Set password to undefined before returning object
    response.send({ user, tokenData });
  };

  login = async (request: express.Request, response: express.Response) => {
    const logInData: LoginUserDto = request.body;
    const user = await this.usersRepository.findOne({ email: logInData.email });

    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        user.password
      );
      if (isPasswordMatching) {
        const tokenData = this.createToken(user);
        user.password = undefined;
        response.send({ user, tokenData });
      } else {
        return response
          .status(404)
          .send({ message: "Invalid username or password" });
      }
    } else {
      return response
        .status(404)
        .send({ message: "Invalid username or password" });
    }
  };

  private createToken(user: User) {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}

export default UserController;
