import { ValidationError, body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../utils/lib/appError';
import tryCatch from '../../utils/helpers/tryCatch.helper';

const errorFormatter = ({ msg }: ValidationError) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return msg;
};

/**
 * Validate addTask request body
 * @param req The request object
 * @param res The response object
 * @param next The next function
 * @returns ErrorResponse | NextFunction
 */
export const addTaskValidator = tryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all([
            body('title')
                .trim()
                .notEmpty()
                .withMessage('title is required')
                .run(req),
            body('description')
                .trim()
                .notEmpty()
                .withMessage('description is required')
                .run(req),
        ]);
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            throw new AppError(
                errors.array().join(', '),
                StatusCodes.BAD_REQUEST
            );
        }
        next();
    }
);
