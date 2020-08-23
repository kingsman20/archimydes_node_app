import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import * as express from "express";

function validationMiddleware(
  type: any,
  skipMissingProperties = false
): express.RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, req.body), { // transforms our plain req object to a class
      skipMissingProperties,
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) => Object.values(error.constraints))
          .join(", ");
        return res.status(400).send({message});
      } else {
        next();
      }
    });
  };
}

export default validationMiddleware;
