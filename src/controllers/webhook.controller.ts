import { NextFunction, Request, Response } from 'express';
import tryCatch from '../utils/helpers/tryCatch.helper';

/**
 * Notify the users when task is created, updated or deleted
 * @param req The request object
 * @param res The response object
 * @param next The next function
 * @returns ISuccessResponse | IErrorResponse
 */
export const webhook = tryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        // Your webhook logic here
        console.log('Webhook received:', req.body);

        return res.status(200).send('OK');
    }
);
