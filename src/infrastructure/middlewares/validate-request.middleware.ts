import { NextFunction, Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { BadRequestException } from "./exeptions/bad-request.extension";
import { ComponentError } from "./exeptions/component-error-detail";

export const validateRequestMiddleware = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const output: any = plainToClass(dtoClass, req.body);
        const errors = await validate(output, { skipMissingProperties: false });
        if (errors?.length > 0) {
            const modelError = new ComponentError();
            errors.forEach(item => {
                const constraints: any = item.constraints;
                Object.keys(constraints).forEach(key => {
                    modelError.addModelError(item.property, constraints[key]);
                })
            });
            next(new BadRequestException(modelError.errors));
        }
        next();
    }
}