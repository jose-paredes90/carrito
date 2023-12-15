import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { InversifyExpressServer } from "inversify-express-utils";
import { BadRequestException } from "./exeptions/bad-request.extension";
import { NotFoundException } from "./exeptions/not-fount.exception";
import { UnauthorizedException } from "./exeptions/unauthorized.exception";

export class ExceptionsMiddleware {

  configureExceptionHandler(server: InversifyExpressServer) {
    server.setErrorConfig((app) => {
      app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err) {
          if (err instanceof NotFoundException) {
            return res.status(StatusCodes.NOT_FOUND).json(err.message)
          }

          if (err instanceof UnauthorizedException) {
            return res.status(StatusCodes.UNAUTHORIZED).json(err.message);
          }

          if (err instanceof BadRequestException) {
            return res.status(StatusCodes.BAD_REQUEST).json(err.errors)
          }

          if (err instanceof Error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message)
          }
        }
        next();
      });
    });
  }
}